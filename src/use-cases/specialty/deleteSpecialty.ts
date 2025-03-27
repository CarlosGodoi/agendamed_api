import { SpecialtiesRepository } from "@/repositories/specialty-repository";
import { AppError } from "@/utils/errors/AppError";

export class DeleteSpecialtyUseCase {
    constructor(private specialtiesRepository: SpecialtiesRepository) { }

    async execute(id: string): Promise<void> {
        const specialtyExists = await this.specialtiesRepository.findById(id)

        if (!specialtyExists) {
            throw new AppError('error', 'User not found.')
        }

        await this.specialtiesRepository.delete(id)
    }
}