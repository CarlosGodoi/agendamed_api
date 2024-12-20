import { Prisma, Appointment } from "@prisma/client";
import { AppointmentsRepository } from "../appointments-repository";
import { IPagination } from "../interfaces/pagination";

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
    public items: Appointment[] = []
    async create(data: Prisma.AppointmentCreateInput) {
        const doctorId = data.doctor.connect?.id
        const patientId = data.patient.connect?.id
        const appointment: Appointment = {
            id: data.id || 'appointment',
            appointmentDateTime: new Date(),
            observation: 'Teste',
            created_at: new Date(),
            updated_at: new Date(),
            doctorId: doctorId || '',
            patientId: patientId || ''
        }

        this.items.push(appointment)

        return appointment
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
    async findById(id: string) {
        const appointment = this.items.find((item) => item.id === id)

        if (!id) {
            return null
        }

        return appointment || null
    }

    async findConflictingAppointment(doctorId: string, appointmentDateTime: Date) {
        const appointment = this.items.find((item) => item.doctorId === doctorId && item.appointmentDateTime === appointmentDateTime)

        if (!appointment) {
            return null
        }

        return appointment
    }

}