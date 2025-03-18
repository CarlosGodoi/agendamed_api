import { AppointmentsRepository } from "@/repositories/appointments-repository";
import { IAppointmentsReportsParams } from "@/repositories/prisma/prisma-appointments-repository";

export class GetAppointmentsReportsUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute(filters: IAppointmentsReportsParams) {
    const appointments =
      await this.appointmentsRepository.getAppointmentsReports(filters);

    return {
      month:
        filters.month && filters.year
          ? new Date(filters.year, filters.month - 1, 1).toLocaleString(
              "pt-BR",
              { month: "long", year: "numeric" }
            )
          : null,
      totalAppointmentsInMonth: appointments.totalAppointmentsInMonth || 0,
      cancelledAppointmentsInMonth:
        appointments.cancelledAppointmentsInMonth || 0,
      selectedDate: appointments.selectedDate,
      completedAppointmentsToday: appointments.completedAppointmentsToday || 0,
      cancelledAppointmentsToday: appointments.cancelledAppointmentsToday || 0,
    };
  }
}
