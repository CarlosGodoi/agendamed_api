import { Prisma, Appointment, AppointmentStatus, Doctor } from "@prisma/client";
import { AppointmentsRepository } from "../appointments-repository";
import { IPagination } from "../interfaces/pagination";
import {
  IAppointmentsReportsParams,
  IMonthlyAppointmentsData,
} from "../prisma/prisma-appointments-repository";

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public items: Appointment[] = [];

  async create(data: Prisma.AppointmentCreateInput) {
    const doctorId = data.doctor.connect?.id;
    const patientId = data.patient.connect?.id;
    const specialtyId = data.specialty.connect?.id;
    const appointment: Appointment = {
      id: data.id || "appointment",
      appointmentDateTime: new Date(),
      status: AppointmentStatus.SCHEDULED,
      observation: "Teste",
      created_at: new Date(),
      updated_at: new Date(),
      doctorId: doctorId || "",
      specialtyId: specialtyId || "",
      patientId: patientId || "",
    };

    this.items.push(appointment);

    return appointment;
  }

  async getAll(data: IPagination) {
    const take = data.take || 10;
    const skip = data.skip || 0;

    const startIndex = skip;
    const endIndex = skip + take;

    const total = this.items.length;
    const totalPage = Math.ceil(total / take);

    const appointments = this.items.slice(startIndex, endIndex);

    return { total, appointments, totalPage };
  }

  async getAppointmentsReports(
    data: IAppointmentsReportsParams
  ): Promise<IAppointmentsReportsParams> {
    const now = new Date();

    const year = data.year || now.getFullYear();
    const currentMonth = now.getMonth();

    // Filtrar appointments pelo ano especificado
    const appointmentsInYear = this.items.filter(
      (item) => item.appointmentDateTime.getFullYear() === year
    );

    // Preparar dados mensais (exemplo para o mês atual)
    const totalAppointmentsInMonth = appointmentsInYear.filter(
      (item) => item.appointmentDateTime.getMonth() === currentMonth
    ).length;

    const attendedAppointmentsInMonth = appointmentsInYear.filter(
      (item) =>
        item.appointmentDateTime.getMonth() === currentMonth &&
        item.status === AppointmentStatus.COMPLETED
    ).length;

    const scheduledAppointmentsInMonth = appointmentsInYear.filter(
      (item) =>
        item.appointmentDateTime.getMonth() === currentMonth &&
        item.status === AppointmentStatus.SCHEDULED
    ).length;

    const cancelledAppointmentsInMonth = appointmentsInYear.filter(
      (item) =>
        item.appointmentDateTime.getMonth() === currentMonth &&
        item.status === AppointmentStatus.CANCELLED
    ).length;

    // Estatísticas gerais para o ano
    const totalAppointmentsAttended = appointmentsInYear.filter(
      (item) => item.status === AppointmentStatus.COMPLETED
    ).length;

    const totalAppointmentsCanceled = appointmentsInYear.filter(
      (item) => item.status === AppointmentStatus.CANCELLED
    ).length;

    // Criar objeto mensal para o mês atual
    const monthlyData: IMonthlyAppointmentsData = {
      month: currentMonth,
      totalAppointments: totalAppointmentsInMonth,
      attendedAppointments: attendedAppointmentsInMonth,
      scheduledAppointments: scheduledAppointmentsInMonth,
      cancelledAppointments: cancelledAppointmentsInMonth,
    };

    // Montar o relatório final
    const report: IAppointmentsReportsParams = {
      year: year,
      monthlyData: [monthlyData],
      totalAppointmentsAttended: totalAppointmentsAttended,
      totalAppointmentsCanceled: totalAppointmentsCanceled,
    };

    return report;
  }

  async update(id: string, data: Prisma.AppointmentUpdateInput) {
    const appointment = this.items.find((item) => item.id === id);

    if (!appointment) {
      return {
        id: "appointment-01",
        appointmentDateTime: new Date(),
        status: AppointmentStatus.SCHEDULED,
        observation: null,
        created_at: new Date(),
        updated_at: new Date(),
        patientId: "patient-01",
        specialtyId: "specialty-001",
        doctorId: "doctor-o1",
      };
    }

    const updatedAppointment: Appointment = {
      ...appointment,
      ...data,
      id: (data.id as string) || appointment.id,
      appointmentDateTime:
        (data.appointmentDateTime as Date) || appointment.appointmentDateTime,
      status: (data.status as AppointmentStatus) || appointment.status,
      observation: (data.observation as string) || appointment.observation,
      created_at: appointment.created_at,
      updated_at: new Date(),
      doctorId: (data.doctor?.connect?.id as string) || appointment.doctorId,
      patientId: (data.patient?.connect?.id as string) || appointment.patientId,
    };

    this.items = this.items.map((item) =>
      item.id === id ? updatedAppointment : item
    );

    return updatedAppointment;
  }
  async findById(id: string) {
    const appointment = this.items.find((item) => item.id === id);

    if (!id) {
      return null;
    }

    return appointment || null;
  }

  async findBySpecialtyId(id: string) {
    const doctors = this.items
      .filter((item) => item.specialtyId === id)
      .map((item) => ({
        name: "Doctor Name",
        id: item.id,
        created_at: item.created_at,
        updated_at: item.updated_at,
        specialtyId: item.specialtyId,
        cpf: "Doctor CPF",
        crm: "Doctor CRM",
      }));

    if (!id) {
      return null;
    }

    return doctors.length ? doctors : null;
  }

  async findConflictingAppointment(
    doctorId: string,
    appointmentDateTime: Date
  ) {
    const appointment = this.items.find(
      (item) =>
        item.doctorId === doctorId &&
        item.appointmentDateTime === appointmentDateTime
    );

    if (!appointment) {
      return null;
    }

    return appointment;
  }
}
