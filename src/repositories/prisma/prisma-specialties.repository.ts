import { Prisma, Specialty } from "@prisma/client";
import { IPagination } from "../interfaces/pagination";
import { SpecialtiesRepository } from "../specialty-repository";
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

interface GetAllSpecialtiesParams {
  skip?: number;
  take?: number;
}

export interface ISpecialtiesParamsGetAll extends IPagination {
  specialties: Specialty[];
  total: number;
  totalPage?: number;
}

export class PrismaSpecialtiesRepository implements SpecialtiesRepository {
  async create(data: Prisma.SpecialtyCreateInput) {
    const specialty = await prisma.specialty.create({
      data,
    });

    return specialty;
  }

  async getAll({
    take,
    skip,
  }: GetAllSpecialtiesParams): Promise<ISpecialtiesParamsGetAll> {
    let pagination: IPagination = {};
    let where: Prisma.SpecialtyWhereInput = {};

    if (skip && take) {
      pagination = Pagination(skip, take);
    }

    const specialties = await prisma.specialty.findMany({
      ...pagination,
      where,
      include: {
        doctors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const total = await prisma.specialty.count({ where });
    const totalPage = take ? Math.ceil(total / take) : total;

    return {
      specialties,
      total,
      ...(pagination.take && { totalPage }),
    };
  }

  async getById(id: string) {
    const specialty = await prisma.specialty.findFirst({
      where: {
        id,
      },
    });

    return specialty;
  }

  async findById(id: string) {
    const specialty = await prisma.specialty.findFirst({
      where: {
        id,
      },
    });

    return specialty;
  }

  async findByName(name: string) {
    const specialty = await prisma.specialty.findFirst({
      where: {
        name,
      },
    });

    return specialty;
  }

  async delete(id: string) {
    const specialty = await prisma.specialty.findUnique({
      where: {
        id,
      },
    });

    if (!specialty) {
      throw new AppError("error", "Specialty not found.");
    }

    await prisma.specialty.delete({
      where: {
        id,
      },
    });
  }
}
