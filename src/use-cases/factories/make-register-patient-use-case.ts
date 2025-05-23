import { PrismaPatientsRespository } from "@/repositories/prisma/prisma-patients-repository";
import { RegisterPatientUseCase } from "../patient/registerPatient";
import { PrismaAppointmentsRepository } from "@/repositories/prisma/prisma-appointments-repository";

export function makeRegisterPatientUseCase() {
    const patientsRepository = new PrismaPatientsRespository()
    const registerPatientUseCase = new RegisterPatientUseCase(patientsRepository)

    return registerPatientUseCase
}