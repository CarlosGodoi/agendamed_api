import { PatientsRepository } from "@/repositories/patients-repository"
import { AppError } from "@/utils/errors/AppError"
import { Appointment, Patient } from "@prisma/client"

interface IRegisterPatientUseCaseRequest {
    name: string
    cpf: string
    email: string
    phone: string
}

interface IRegisterPatientUseCaseResponse {
    patient: Patient
}

export class RegisterPatientUseCase {
    constructor(private patientsRepository: PatientsRepository) { }

    async execute({ name, cpf, email, phone }: IRegisterPatientUseCaseRequest): Promise<IRegisterPatientUseCaseResponse> {
        try {
            const patientExists = await this.patientsRepository.findByCpf(cpf)

            if (patientExists) {
                throw new AppError('error', 'Este paciente já possui cadastro.');
            }

            const patient = await this.patientsRepository.create({
                name,
                cpf,
                email,
                phone,
            })

            return { patient }
        } catch (error) {
            console.error('Erro no RegisterPatientUseCase:', error);
            throw error;
        }
    }
}