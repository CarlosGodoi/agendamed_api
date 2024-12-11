import { makeRegisterSpecialtyUseCase } from "@/use-cases/factories/make-register-specialty-use-case";
import { makeRegisterDoctorUseCase } from "@/use-cases/factories/make-register-doctor-use-case";
import { AppError } from "@/utils/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { registerDoctorBodySchema } from "./schema/registerDoctorSchema";
import { PrismaSpecialtiesRepository } from "@/repositories/prisma/prisma-specialties.repository";
import { PrismaDoctorsRepository } from "@/repositories/prisma/prisma-doctors-repository";

export async function registerDoctorWithSpecialty(req: Request, res: Response, next: NextFunction) {
    const { name, cpf, crm, specialtyName, specialtyId } = registerDoctorBodySchema.parse(req.body);

    try {
        const registerSpecialtyUseCase = makeRegisterSpecialtyUseCase();
        const registerDoctorUseCase = makeRegisterDoctorUseCase();
        const specialtiesRepository = new PrismaSpecialtiesRepository();
        const doctorsRespository = new PrismaDoctorsRepository()
        let specialtyIdToUse = specialtyId;

        if (!specialtyIdToUse) {
            // Tentar encontrar a especialidade pelo nome
            const existingSpecialty = await specialtiesRepository.findByName(specialtyName || '');

            if (existingSpecialty) {
                // Se já existe, usar o ID da especialidade existente
                specialtyIdToUse = existingSpecialty.id;
            } else {
                // Caso não exista, criar a especialidade e pegar o ID gerado
                const createdSpecialty = await registerSpecialtyUseCase.execute({ name: specialtyName ? specialtyName : '' });
                specialtyIdToUse = createdSpecialty.specialty.id;
            }
        } else {
            // Verificar se o specialtyId fornecido realmente existe
            const specialtyExists = await specialtiesRepository.findById(specialtyIdToUse);

            if (!specialtyExists) {
                throw new AppError('error', 'Provided specialty does not exist.');
            }
        }

        const doctorExists = await doctorsRespository.findByCpf(cpf)

        if (doctorExists) {
            throw new AppError('error', 'Doctor already exists.')
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
