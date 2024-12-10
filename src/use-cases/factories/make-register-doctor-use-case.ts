import { PrismaDoctorsRepository } from "@/repositories/prisma/prisma-doctors-repository";
import { PrismaSpecialtiesRepository } from "@/repositories/prisma/prisma-specialties.repository";
import { RegisterDoctorUseCase } from "../doctors/registerDoctor";

export function makeRegisterDoctorUseCase() {
    const registerDoctorsRepository = new PrismaDoctorsRepository()
    const specialtiesRepository = new PrismaSpecialtiesRepository()

    const registerDoctorUseCase = new RegisterDoctorUseCase(registerDoctorsRepository, specialtiesRepository)

    return registerDoctorUseCase
}