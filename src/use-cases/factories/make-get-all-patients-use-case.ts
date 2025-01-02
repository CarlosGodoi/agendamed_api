import { PrismaPatientsRespository } from "@/repositories/prisma/prisma-patients-repository";
import { GetAllPatientsUseCase } from "../patient/getAllPatients";

export function makeGetAllPatientsUseCase() {
    const patientsRepository = new PrismaPatientsRespository();
    const getAllPatientsUseCase = new GetAllPatientsUseCase(patientsRepository);

    return getAllPatientsUseCase;
}