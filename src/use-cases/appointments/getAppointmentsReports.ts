import { AppointmentsRepository } from "@/repositories/appointments-repository";
import { IAppointmentsReportsParams } from "@/repositories/prisma/prisma-appointments-repository";

export class GetAppointmentsReportsUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute(filters: IAppointmentsReportsParams) {
    const appointments =
      await this.appointmentsRepository.getAppointmentsReports(filters);
      

    return {
      year: filters.year ?? new Date().getFullYear(),
      monthlyData: appointments.monthlyData || [],
      totalAppointmentsAttended: appointments.totalAppointmentsAttended || 0,
      totalAppointmentsCanceled: appointments.totalAppointmentsCanceled || 0,
    };
  }
}
