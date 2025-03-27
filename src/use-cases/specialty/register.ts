import { SpecialtiesRepository } from "@/repositories/specialty-repository";
import { AppError } from "@/utils/errors/AppError";
import { Specialty } from "@prisma/client";

interface IRegisterSpecialtyUseCaseRequest {
    id?: string
    name: string
}

interface IRegisterSpecialtyUseCaseResponse {
    specialty: Specialty
}

export class RegisterSpecialtyUseCase {
    constructor(private specialtyRepository: SpecialtiesRepository) { }

    async execute({ id, name }: IRegisterSpecialtyUseCaseRequest): Promise<IRegisterSpecialtyUseCaseResponse> {
        try {
            const specialtyExists = await this.specialtyRepository.findById(id || '')

            if (specialtyExists) {
                throw new AppError('error', 'This specialty already exists')
            }

            const specialty = await this.specialtyRepository.create({
                name,
            })
            return { specialty }
        } catch (error) {
            console.error('Erro no RegisterSpecialtyUseCase:', error);
            throw error;
        }
    }
}