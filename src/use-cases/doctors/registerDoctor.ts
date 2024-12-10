import { DoctorsRepository } from "@/repositories/doctors-repository"
import { SpecialtiesRepository } from "@/repositories/specialty-repository"
import { AppError } from "@/utils/errors/AppError"
import { Doctor } from "@prisma/client"

interface IRegisterDoctorUseCaseRequest {
    name: string
    cpf: string
    crm: string
    specialtyId: string
}

interface IRegisterDoctorUseCaseResponse {
    doctor: Doctor
}

export class RegisterDoctorUseCase {
    constructor(private doctorsRespository: DoctorsRepository, private specialtiesRespository: SpecialtiesRepository) { }

    async execute({ name, cpf, crm, specialtyId }: IRegisterDoctorUseCaseRequest): Promise<IRegisterDoctorUseCaseResponse> {

        try {
            const specialtyExists = await this.specialtiesRespository.findById(specialtyId)

            if (!specialtyExists) {
                throw new AppError('error', 'Specialty not found.')
            }

            const doctor = await this.doctorsRespository.create({
                name,
                cpf,
                crm,
                specialty: {
                    connect: {
                        id: specialtyId
                    }
                }
            })

            return { doctor }
        } catch (error) {
            console.error('Erro no RegisterUseCase:', error);
            throw error;
        }
    }
}