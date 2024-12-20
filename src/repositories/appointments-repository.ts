import { Appointment, Prisma } from "@prisma/client";
import { IPagination } from "./interfaces/pagination";

export interface AppointmentsRepository {
    create(data: Prisma.AppointmentCreateInput): Promise<Appointment>
    getAll(data: IPagination): Promise<{ total: number; appointments: Appointment[]; totalPage?: number }>
    findById(id: string): Promise<Appointment | null>
    findConflictingAppointment(doctorId: string, appointmentDateTime: Date): Promise<Appointment | null>;
}