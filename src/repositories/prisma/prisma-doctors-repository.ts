import { Doctor, Prisma } from "@prisma/client";
import { IPagination } from "../interfaces/pagination";
import { DoctorsRepository } from "../doctors-repository";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/errors/AppError";

const Pagination = (skip: number, take: number) => {
  const calcSkip = (skip - 1) * take;

  const pagination = {
    skip: calcSkip < 0 ? 0 : calcSkip,
    take: Number(take),
  };

  return pagination;
};

interface GetAllDoctorsParams {
  skip?: number;
  take?: number;
}

export interface IDoctorsParamsGetAll extends IPagination {
  doctors: Doctor[];
  total: number;
  totalPage?: number;
}

export class PrismaDoctorsRepository implements DoctorsRepository {
  async create(data: Prisma.DoctorCreateInput) {
    const doctor = await prisma.doctor.create({
      data,
    });

    return doctor;
  }

  async getAll({
    skip,
    take,
  }: GetAllDoctorsParams): Promise<IDoctorsParamsGetAll> {
    let pagination: IPagination = {};
    let where: Prisma.DoctorWhereInput = {};

    if (skip && take) {
      pagination = Pagination(skip, take);
    }

    const doctors = await prisma.doctor.findMany({
      ...pagination,
      where,
      include: {
        specialty: {
          select: {
            name: true,
          },
        },
      },
    });

    const total = await prisma.doctor.count({ where });
    const totalPage = take ? Math.ceil(total / take) : total;

    return {
      doctors,
      total,
      ...(pagination.take && { totalPage }),
    };
  }

  async getById(id: string) {
    const doctor = await prisma.doctor.findFirst({
      where: {
        id,
      },
    });
    return doctor;
  }

  async findByName(name: string) {
    const doctor = await prisma.doctor.findFirst({
      where: {
        name,
      },
    });

    return doctor;
  }

  async findById(id: string) {
    const doctor = await prisma.doctor.findFirst({
      where: {
        id,
      },
    });
    return doctor;
  }

  async findByCpf(cpf: string) {
    const doctor = await prisma.doctor.findUnique({
      where: {
        cpf,
      },
    });

    return doctor;
  }

  async delete(id: string) {
    const doctor = await prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    if (!doctor) {
      throw new AppError("error", "Doctor not found.");
    }

    await prisma.doctor.delete({
      where: {
        id,
      },
    });
  }
}
