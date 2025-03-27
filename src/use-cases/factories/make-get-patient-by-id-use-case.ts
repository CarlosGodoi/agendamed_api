import { PrismaPatientsRespository } from "@/repositories/prisma/prisma-patients-repository";
import { GetPatientByIdUseCase } from "../patient/getPatientById";

export function makeGetPatientByIdUseCase() {
    const getPatientByIdRepository = new PrismaPatientsRespository()
    const getPatientByIdUseCase = new GetPatientByIdUseCase(getPatientByIdRepository)

    return getPatientByIdUseCase
}