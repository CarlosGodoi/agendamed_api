import { Prisma, Appointment, AppointmentStatus, Doctor } from "@prisma/client";
import { AppointmentsRepository } from "../appointments-repository";
import { IPagination } from "../interfaces/pagination";

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

  async getAppointmentsReports(data: IAppointmentsReports) {
    const now = new Date();
    const month = now.toLocaleString("default", { month: "long" });

    const totalAppointmentsInMonth = this.items.filter(
      (item) =>
        item.appointmentDateTime.getMonth() === now.getMonth() &&
        item.appointmentDateTime.getFullYear() === now.getFullYear()
    ).length;

    const cancelledAppointmensInMonth = this.items.filter(
      (item) =>
        item.appointmentDateTime.getMonth() === now.getMonth() &&
        item.appointmentDateTime.getFullYear() === now.getFullYear() &&
        item.status === AppointmentStatus.CANCELLED
    ).length;

    const completedAppointmentsToday = this.items.filter(
      (item) =>
        item.appointmentDateTime.toDateString() === now.toDateString() &&
        item.status === AppointmentStatus.COMPLETED
    ).length;

    const cancelledAppointmentsToday = this.items.filter(
      (item) =>
        item.appointmentDateTime.toDateString() === now.toDateString() &&
        item.status === AppointmentStatus.CANCELLED
    ).length;

    return {
      month,
      totalAppointmentsInMonth,
      cancelledAppointmensInMonth,
      completedAppointmentsToday,
      cancelledAppointmentsToday,
    };
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
