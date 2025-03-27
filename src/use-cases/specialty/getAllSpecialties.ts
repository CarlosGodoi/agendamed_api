import { ISpecialtiesParamsGetAll } from "@/repositories/prisma/prisma-specialties.repository";
import { SpecialtiesRepository } from "@/repositories/specialty-repository";
import { Specialty } from "@prisma/client";

export class GetAllSpecialtiesUseCase {
    constructor(private specialtiesRepository: SpecialtiesRepository) { }

    async execute(pagination: ISpecialtiesParamsGetAll): Promise<{ total: number, specialties: Specialty[] }> {
        const specialties = await this.specialtiesRepository.getAll(pagination)

        return specialties
    }
}