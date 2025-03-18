import { PrismaAppointmentsRepository } from "@/repositories/prisma/prisma-appointments-repository";
import { GetAppointmentsReportsUseCase } from "../appointments/getAppointmentsReports";

export function makeAppointmentsReportsUseCase() {
  const appointmentsRepository = new PrismaAppointmentsRepository();
  const getAppointmentsReportsUseCase = new GetAppointmentsReportsUseCase(
    appointmentsRepository
  );

  return getAppointmentsReportsUseCase;
}
