import { AppointmentsRepository } from "@/repositories/appointments-repository";
import { AppError } from "@/utils/errors/AppError";
import { Appointment, AppointmentStatus } from "@prisma/client";

interface IUpdateStatusAppointmentUseCaseRequest {
    appointmentId: string;
    status: AppointmentStatus;
}

interface IUpdateStatusAppointmentUseCaseResponse {
    appointment: Appointment;
}


export class UpdateAppointmentStatusUseCase {
    constructor(private appointmentsRepository: AppointmentsRepository) { }

    async execute({ appointmentId, status }: IUpdateStatusAppointmentUseCaseRequest): Promise<IUpdateStatusAppointmentUseCaseResponse> {
        const appointment = await this.appointmentsRepository.findById(appointmentId);

        if (!appointment) {
            throw new AppError("not_found", "Consulta não encontrada.");
        }

        const updatedAppointment = await this.appointmentsRepository.update(appointmentId, {
            status,
            updated_at: new Date()
        });

        return { appointment: updatedAppointment };
    }
}