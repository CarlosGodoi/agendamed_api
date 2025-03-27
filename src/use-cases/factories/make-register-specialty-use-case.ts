import { PrismaSpecialtiesRepository } from "@/repositories/prisma/prisma-specialties.repository";
import { RegisterSpecialtyUseCase } from "../specialty/register";

export function makeRegisterSpecialtyUseCase() {
    const specialtiesRepository = new PrismaSpecialtiesRepository()
    const registerSpecialtyUseCase = new RegisterSpecialtyUseCase(specialtiesRepository)

    return registerSpecialtyUseCase
}