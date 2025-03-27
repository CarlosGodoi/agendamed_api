import { PatientsRepository } from "@/repositories/patients-repository";
import { AppError } from "@/utils/errors/AppError";
import { Patient } from "@prisma/client";


export class GetPatientByIdUseCase {
    constructor(private patientsRepository: PatientsRepository) { }

    async execute(id: string): Promise<Patient | null> {
        const patient = await this.patientsRepository.findById(id)

        if (!patient) {
            throw new AppError('error', 'Patient not found')
        }

        return patient
    }
}