import { Prisma, Appointment, Specialty } from "@prisma/client";
import { AppointmentsRepository } from "../appointments-repository";
import { IPagination } from "../interfaces/pagination";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/errors/AppError";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";

const Pagination = (skip: number, take: number) => {
  const calcSkip = (skip - 1) * take;

  const pagination = {
    skip: calcSkip < 0 ? 0 : calcSkip,
    take: Number(take),
  };

  return pagination;
};

interface GetAllAppointmentsParams {
  skip?: number;
  take?: number;
}

export interface IAppointmentsParamsGetAll extends IPagination {
  appointments: Appointment[];
  total: number;
  totalPage?: number;
}

export interface IMonthlyAppointmentsData {
  month: number;
  totalAppointments: number;
  attendedAppointments: number;
  scheduledAppointments: number;
  cancelledAppointments: number;
}

export interface IAppointmentsReportsParams {
  year?: number;
  monthlyData?: IMonthlyAppointmentsData[];
  totalAppointmentsAttended?: number;
  totalAppointmentsCanceled?: number;
}

export class PrismaAppointmentsRepository implements AppointmentsRepository {
  async create(data: Prisma.AppointmentCreateInput) {
    const appointment = await prisma.appointment.create({
      data,
    });

    return appointment;
  }

  async getAll({
    take,
    skip,
  }: GetAllAppointmentsParams): Promise<IAppointmentsParamsGetAll> {
    let pagination: IPagination = {};
    let where: Prisma.AppointmentWhereInput = {};

    if (skip && take) {
      pagination = Pagination(skip, take);
    }

    const appointments = await prisma.appointment.findMany({
      ...pagination,
      where,
      include: {
        patient: {
          select: {
            name: true,
            cpf: true,
            phone: true,
          },
        },
        doctor: {
          select: {
            name: true,
          },
        },
        specialty: {
          select: {
            name: true,
          },
        },
      },
    });

    const total = await prisma.appointment.count({ where });
    const totalPage = take ? Math.ceil(total / take) : total;

    return {
      appointments,
      total,
      ...(pagination.take && { totalPage }),
    };
  }

  async getAppointmentsReports({
    year,
  }: IAppointmentsReportsParams): Promise<IAppointmentsReportsParams> {
    if (!year) {
      year = new Date().getFullYear();
    }

    const monthlyData = await Promise.all(
      Array.from({ length: 12 }).map(async (_, index) => {
        const month = index + 1;
        const startOfCurrentMonth = startOfMonth(new Date(year, month - 1));
        const endOfCurrentMonth = endOfMonth(new Date(year, month - 1));

        const totalAppointments = await prisma.appointment.count({
          where: {
            appointmentDateTime: {
              gte: startOfCurrentMonth,
              lte: endOfCurrentMonth,
            },
          },
        });

        const attendedAppointments = await prisma.appointment.count({
          where: {
            status: "COMPLETED",
            appointmentDateTime: {
              gte: startOfCurrentMonth,
              lte: endOfCurrentMonth,
            },
          },
        });

        const scheduledAppointments = await prisma.appointment.count({
          where: {
            status: "SCHEDULED",
            appointmentDateTime: {
              gte: startOfCurrentMonth,
              lte: endOfCurrentMonth,
            },
          },
        });

        const cancelledAppointments = await prisma.appointment.count({
          where: {
            status: "CANCELLED",
            appointmentDateTime: {
              gte: startOfCurrentMonth,
              lte: endOfCurrentMonth,
            },
          },
        });

        return {
          month,
          totalAppointments,
          attendedAppointments,
          scheduledAppointments,
          cancelledAppointments,
        };
      })
    );

    // Agora somamos os valores de cada mês para obter os totais
    const totalAppointmentsAttended = monthlyData.reduce(
      (acc, month) => acc + month.attendedAppointments,
      0
    );

    const totalAppointmentsCanceled = monthlyData.reduce(
      (acc, month) => acc + month.cancelledAppointments,
      0
    );

    console.log(
      "Response =>",
      year,
      monthlyData,
      totalAppointmentsAttended,
      totalAppointmentsCanceled
    );

    return {
      year,
      monthlyData,
      totalAppointmentsAttended,
      totalAppointmentsCanceled,
    };
  }

  async update(id: string, data: Prisma.AppointmentUpdateInput) {
    const appointment = await prisma.appointment.update({
      where: {
        id,
      },
      data,
    });

    return appointment;
  }
  async findById(id: string) {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: id,
      },
    });

    return appointment;
  }

  async findBySpecialtyId(id: string) {
    const doctors = await prisma.doctor.findMany({
      where: {
        id,
      },
    });

    return doctors;
  }

  async findConflictingAppointment(
    doctorId: string,
    appointmentDateTime: Date
  ) {
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
