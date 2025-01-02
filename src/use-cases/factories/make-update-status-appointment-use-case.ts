import { PrismaAppointmentsRepository } from "@/repositories/prisma/prisma-appointments-repository";
import { UpdateAppointmentStatusUseCase } from "../appointments/updateStatusAppointment";

// src/use-cases/factories/make-update-appointment-status-use-case.ts
export function makeUpdateAppointmentStatusUseCase() {
    const appointmentsRepository = new PrismaAppointmentsRepository();
    const updateAppointmentStatusUseCase = new UpdateAppointmentStatusUseCase(appointmentsRepository);

    return updateAppointmentStatusUseCase;
}