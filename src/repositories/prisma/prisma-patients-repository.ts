import { Prisma, Patient } from "@prisma/client";
import { IPagination } from "../interfaces/pagination";
import { PatientsRepository } from "../patients-repository";
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

interface GetAllPatientsParams {
    skip?: number;
    take?: number;
}

export interface IPatientsParamsGetAll extends IPagination {
    patients: Patient[];
    total: number;
    totalPage?: number;
}

export class PrismaPatientsRespository implements PatientsRepository {
    async create(data: Prisma.PatientCreateInput) {
        const patient = await prisma.patient.create({
            data
        })

        return patient
    }
    async getAll({ take, skip }: GetAllPatientsParams): Promise<IPatientsParamsGetAll> {
        let pagination: IPagination = {}
        let where: Prisma.PatientWhereInput = {}

        if (skip && take) {
            pagination = Pagination(skip, take);
        }

        const patients = await prisma.patient.findMany({
            ...pagination,
            where,
        });

        const total = await prisma.patient.count({ where });
        const totalPage = take ? Math.ceil(total / take) : total;

        return {
            patients,
            total,
            ...(pagination.take && { totalPage })
        };
    }
    async findByCpf(cpf: string) {
        const patient = await prisma.patient.findFirst({
            where: {
                cpf
            }
        })

        return patient
    }
    async findById(id: string) {
        const patient = await prisma.patient.findFirst({
            where: {
                id
            }
        })

        return patient
    }
    async delete(id: string) {
        const patient = await prisma.patient.findUnique({
            where: {
                id
            }
        })

        if (!patient) {
            throw new AppError('error', 'Patient not found.')
        }

        await prisma.patient.delete({
            where: {
                id
            }
        })
    }

}