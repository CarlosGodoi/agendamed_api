import { PatientsRepository } from "@/repositories/patients-repository"
import { IPatientsParamsGetAll } from "@/repositories/prisma/prisma-patients-repository"
import { Patient } from "@prisma/client"

export class GetAllPatientsUseCase {
    constructor(private patientsRepository: PatientsRepository) { }

    async execute(pagination: IPatientsParamsGetAll): Promise<{ total: number, patients: Patient[] }> {
        const patients = await this.patientsRepository.getAll(pagination)

        return patients
    }
}