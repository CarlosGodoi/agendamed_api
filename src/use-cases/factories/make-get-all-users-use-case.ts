import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetAllUsersUseCase } from "../users/getAllUsers";

export function makeGetAllUsersUseCase() {
    const getAllUsersRepository = new PrismaUsersRepository()
    const getAllUsersUseCase = new GetAllUsersUseCase(getAllUsersRepository)

    return getAllUsersUseCase
}