import { AppointmentsRepository } from "@/repositories/appointments-repository"
import { AppError } from "@/utils/errors/AppError"
import { Appointment } from "@prisma/client"

export class GetAppointmentByIdUseCase {
    constructor(private appointmentsRepository: AppointmentsRepository) { }

    async execute(id: string): Promise<Appointment | null> {
        const appointment = await this.appointmentsRepository.findById(id)

        if (!appointment) {
            throw new AppError('error', 'Appointment not found')
        }

        return appointment
    }
}