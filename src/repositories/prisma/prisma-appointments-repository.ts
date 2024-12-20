import { Prisma, Appointment } from "@prisma/client";
import { AppointmentsRepository } from "../appointments-repository";
import { IPagination } from "../interfaces/pagination";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/errors/AppError";

const Pagination = (skip: number, take: number) => {
    const calcSkip = (skip - 1) * take

    const pagination = {
        skip: calcSkip < 0 ? 0 : calcSkip,
        take: Number(take)
    }

    return pagination
}

interface GetAllAppointmentsParams {
    skip?: number;
    take?: number;
}

export interface IAppointmentsParamsGetAll extends IPagination {
    appointments: Appointment[];
    total: number;
    totalPage?: number;
}

export class PrismaAppointmentsRepository implements AppointmentsRepository {
    async create(data: Prisma.AppointmentCreateInput) {
        const appointment = await prisma.appointment.create({
            data
        })

        return appointment
    }
    async getAll({ take, skip }: GetAllAppointmentsParams): Promise<IAppointmentsParamsGetAll> {
        let pagination: IPagination = {}
        let where: Prisma.AppointmentWhereInput = {}

        if (skip && take) {
            pagination = Pagination(skip, take);
        }

        const appointments = await prisma.appointment.findMany({
            ...pagination,
            where
        })

        const total = await prisma.appointment.count({ where });
        const totalPage = take ? Math.ceil(total / take) : total;

        return {
            appointments,
            total,
            ...(pagination.take && { totalPage })
        };
    }
    async findById(id: string) {
        const appointment = await prisma.appointment.findUnique({
            where: {
                id
            }
        })

        return appointment
    }

    async findConflictingAppointment(doctorId: string, appointmentDateTime: Date) {
        // Cria um intervalo de 1 hora para a consulta
        const startTime = new Date(appointmentDateTime);
        const endTime = new Date(appointmentDateTime);
        endTime.setHours(endTime.getHours() + 1);

        const conflictingAppointment = await prisma.appointment.findFirst({
            where: {
                doctorId,
                appointmentDateTime: {
                    gte: startTime,
                    lt: endTime,
                },
            },
        });

        return conflictingAppointment;
    }

}