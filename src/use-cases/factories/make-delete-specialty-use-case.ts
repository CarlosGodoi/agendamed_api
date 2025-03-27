import { PrismaSpecialtiesRepository } from "@/repositories/prisma/prisma-specialties.repository"
import { DeleteSpecialtyUseCase } from "../specialty/deleteSpecialty"

export function makeDeleteSpecialtyUseCase() {
    const deleteSpecialtyRepository = new PrismaSpecialtiesRepository()
    const deleteSpecialtyUseCase = new DeleteSpecialtyUseCase(deleteSpecialtyRepository)

    return deleteSpecialtyUseCase
}