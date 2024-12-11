import { PrismaSpecialtiesRepository } from "@/repositories/prisma/prisma-specialties.repository";
import { GetAllSpecialtiesUseCase } from "../specialty/getAllSpecialties";

export function makeGetAllSpecialtiesUseCase() {
    const getAllSpecialtiesRepository = new PrismaSpecialtiesRepository()
    const getAllSpecialtiesUseCase = new GetAllSpecialtiesUseCase(getAllSpecialtiesRepository)

    return getAllSpecialtiesUseCase
}