import { DoctorsRepository } from "@/repositories/doctors-repository";
import { IDoctorsParamsGetAll } from "@/repositories/prisma/prisma-doctors-repository";
import { Doctor } from "@prisma/client";

export class GetAllDoctorsUseCase {
    constructor(private doctorsRepository: DoctorsRepository) { }

    async execute(pagination: IDoctorsParamsGetAll): Promise<{ total: number, doctors: Doctor[] }> {
        const doctors = await this.doctorsRepository.getAll(pagination)

        return doctors
    }
}