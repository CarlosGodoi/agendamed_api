import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'
import { Prisma, User } from '@prisma/client'
import { IPagination } from '../interfaces/pagination'

const Pagination = (skip: number, take: number) => {
    const calcSkip = (skip - 1) * take

    const pagination = {
        skip: calcSkip < 0 ? 0 : calcSkip,
        take: Number(take)
    }

    return pagination
}

interface FilterParams {
    name?: string;
    cpf?: string;
}

interface GetAllParams {
    skip?: number;
    take?: number;
    search?: string;
    [key: string]: any;
}

export interface IUsersParamsGetAll extends IPagination {
    users: User[];
    total: number;
    totalPage?: number;
}


export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user
    }

    async getAll({ skip, take, search }: GetAllParams): Promise<IUsersParamsGetAll> {
        let pagination: IPagination = {};
        let where: Prisma.UserWhereInput = {};

        if (skip && take) {
            pagination = Pagination(skip, take);
        }

        where = {
            ...(search && {
                OR: [
                    {
                        name: {
                            startsWith: search
                        }
                    },
                    {
                        cpf: {
                            startsWith: search
                        }
                    }
                ]
            })
        };

        const user = await prisma.user.findMany({
            where,
            orderBy: [
                {
                    name: 'asc'
                },
                {
                    cpf: 'asc'
                }
            ],
            ...pagination
        });

        const total = await prisma.user.count({ where });
        const totalPage = take ? Math.ceil(total / take) : total;

        return {
            users: user,
            total,
            ...(pagination.take && { totalPage })
        };
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }
    async findById(id: string) {
        const user = await prisma.user.findFirst({
            where: {
                id,
            }
        })

        return user
    }
}