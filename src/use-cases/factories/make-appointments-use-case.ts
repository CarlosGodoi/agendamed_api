import { PrismaAppointmentsRepository } from "@/repositories/prisma/prisma-appointments-repository";
import { PrismaPatientsRespository } from "@/repositories/prisma/prisma-patients-repository";
import { RegisterAppointmentUseCase } from "../appointments/registerAppointment";
import { PrismaDoctorsRepository } from "@/repositories/prisma/prisma-doctors-repository";

export function makeRegisterAppointmentsUseCase() {
    const appointmenstRepository = new PrismaAppointmentsRepository();
    const patientsRepository = new PrismaPatientsRespository();
    const doctorsRepository = new PrismaDoctorsRepository();

    const registerAppointmentUseCase = new RegisterAppointmentUseCase(appointmenstRepository, doctorsRepository, patientsRepository)

    return registerAppointmentUseCase;
}