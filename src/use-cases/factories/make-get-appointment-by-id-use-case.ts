import { PrismaAppointmentsRepository } from "@/repositories/prisma/prisma-appointments-repository";
import { GetAppointmentByIdUseCase } from "../appointments/getAppointmentById";

export function makeGetAppointmentByIdUseCase() {
    const getAppointmentByIdRepository = new PrismaAppointmentsRepository()
    const getAppointmentByIdUseCase = new GetAppointmentByIdUseCase(getAppointmentByIdRepository)

    return getAppointmentByIdUseCase
}