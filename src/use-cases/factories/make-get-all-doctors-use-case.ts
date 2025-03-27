import { PrismaDoctorsRepository } from "@/repositories/prisma/prisma-doctors-repository";
import { GetAllDoctorsUseCase } from "../doctors/getAllDoctors";

export function makeGetAllDoctorUseCase() {
    const doctorsRepository = new PrismaDoctorsRepository()
    const getAllDoctorsUseCase = new GetAllDoctorsUseCase(doctorsRepository)

    return getAllDoctorsUseCase
}