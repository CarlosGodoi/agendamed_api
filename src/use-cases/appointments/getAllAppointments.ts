import { AppointmentsRepository } from "@/repositories/appointments-repository";
import { IAppointmentsParamsGetAll } from "@/repositories/prisma/prisma-appointments-repository";
import { Appointment } from "@prisma/client";

export class GetAllAppointmentsUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute(
    pagination: IAppointmentsParamsGetAll
  ): Promise<{ total: number; appointments: Appointment[] }> {
    const appointments = await this.appointmentsRepository.getAll(pagination);

    return appointments;
  }
}
