import { PrismaAppointmentsRepository } from "@/repositories/prisma/prisma-appointments-repository";
import { PrismaPatientsRespository } from "@/repositories/prisma/prisma-patients-repository";
import { RegisterAppointmentUseCase } from "../appointments/registerAppointment";
import { PrismaDoctorsRepository } from "@/repositories/prisma/prisma-doctors-repository";
import { PrismaSpecialtiesRepository } from "@/repositories/prisma/prisma-specialties.repository";

export function makeRegisterAppointmentsUseCase() {
  const appointmenstRepository = new PrismaAppointmentsRepository();
  const patientsRepository = new PrismaPatientsRespository();
  const doctorsRepository = new PrismaDoctorsRepository();
  const specialtiesRepository = new PrismaSpecialtiesRepository();

  const registerAppointmentUseCase = new RegisterAppointmentUseCase(
    appointmenstRepository,
    doctorsRepository,
    patientsRepository,
    specialtiesRepository
  );

  return registerAppointmentUseCase;
}
