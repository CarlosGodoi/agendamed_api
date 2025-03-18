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

export interface IAppointmentsReportsParams {
  month?: number;
  year?: number;
  date?: string;
  selectedDate?: string;
  totalAppointmentsInMonth?: number;
  cancelledAppointmentsInMonth?: number;
  completedAppointmentsToday?: number;
  cancelledAppointmentsToday?: number;
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
    month,
    year,
    date,
  }: IAppointmentsReportsParams): Promise<IAppointmentsReportsParams> {
    const timeZone = "America/Sao_Paulo";
    const now = new Date();

    let startOfCurrentMonth, endOfCurrentMonth;
    let startOfSelectedDay, endOfSelectedDay;

    if (month && year) {
      startOfCurrentMonth = startOfMonth(new Date(year, month - 1));
      endOfCurrentMonth = endOfMonth(new Date(year, month - 1));
    } else {
      startOfCurrentMonth = startOfMonth(now);
      endOfCurrentMonth = endOfMonth(now);
    }

    // 🚀 CORREÇÃO AQUI 🚀
    if (date) {
      // Criar a data diretamente sem "T00:00:00Z"
      const selectedDate = toZonedTime(new Date(date), timeZone);

      startOfSelectedDay = startOfDay(selectedDate);
      endOfSelectedDay = endOfDay(selectedDate);
    } else {
      startOfSelectedDay = startOfDay(toZonedTime(now, timeZone));
      endOfSelectedDay = endOfDay(toZonedTime(now, timeZone));
    }

    const totalAppointmentsInMonth = await prisma.appointment.count({
      where: {
        appointmentDateTime: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    });

    const cancelledAppointmentsInMonth = await prisma.appointment.count({
      where: {
        status: "CANCELLED",
        appointmentDateTime: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    });

    const completedAppointmentsToday = await prisma.appointment.count({
      where: {
        status: "COMPLETED",
        appointmentDateTime: {
          gte: startOfSelectedDay,
          lte: endOfSelectedDay,
        },
      },
    });

    const cancelledAppointmentsToday = await prisma.appointment.count({
      where: {
        status: "CANCELLED",
        appointmentDateTime: {
          gte: startOfSelectedDay,
          lte: endOfSelectedDay,
        },
      },
    });

    return {
      month,
      year,
      selectedDate: format(startOfSelectedDay, "dd/MM/yyyy"),
      totalAppointmentsInMonth,
      cancelledAppointmentsInMonth,
      completedAppointmentsToday,
      cancelledAppointmentsToday,
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
