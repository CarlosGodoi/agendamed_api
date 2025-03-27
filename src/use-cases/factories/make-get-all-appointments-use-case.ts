import { PrismaAppointmentsRepository } from "@/repositories/prisma/prisma-appointments-repository";
import { GetAllAppointmentsUseCase } from "../appointments/getAllAppointments";

export function makeGetAllAppointmentsUseCase() {
  const appointmentsRepository = new PrismaAppointmentsRepository();
  const getAllAppointmentsUseCase = new GetAllAppointmentsUseCase(
    appointmentsRepository
  );

  return getAllAppointmentsUseCase;
}
