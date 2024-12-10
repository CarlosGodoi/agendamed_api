import { makeRegisterSpecialtyUseCase } from "@/use-cases/factories/make-register-specialty-use-case";
import { makeRegisterDoctorUseCase } from "@/use-cases/factories/make-register-doctor-use-case";
import { AppError } from "@/utils/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { registerDoctorBodySchema } from "./schema/registerDoctorSchema";
import { PrismaSpecialtiesRepository } from "@/repositories/prisma/prisma-specialties.repository";

export async function registerDoctorWithSpecialty(req: Request, res: Response, next: NextFunction) {
    const { name, cpf, crm, specialtyName, specialtyId } = registerDoctorBodySchema.parse(req.body);

    try {
        const registerSpecialtyUseCase = makeRegisterSpecialtyUseCase();
        const registerDoctorUseCase = makeRegisterDoctorUseCase();
        let specialtyIdToUse = specialtyId;

        // Verificar se o specialtyId foi fornecido e existe
        if (specialtyIdToUse) {
            const specialtiesRepository = new PrismaSpecialtiesRepository();
            const specialtyExists = await specialtiesRepository.findById(specialtyIdToUse);

            if (!specialtyExists) {
                throw new AppError('error', 'Provided specialty does not exist.');
            }
        } else {
            // Criar uma nova especialidade se specialtyId não foi fornecido
            const createdSpecialty = await registerSpecialtyUseCase.execute({ name: specialtyName ? specialtyName : '' });
            specialtyIdToUse = createdSpecialty.specialty.id;
        }

        // Criar médico com specialtyId resolvido
        const doctor = await registerDoctorUseCase.execute({
            name,
            cpf,
            crm,
            specialtyId: specialtyIdToUse,
        });

        return res.status(201).json({ doctor });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(400).json({ error: error.message });
        } else {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
}
