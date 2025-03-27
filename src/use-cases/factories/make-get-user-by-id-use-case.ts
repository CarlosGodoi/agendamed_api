import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserByIdUseCase } from "../users/getUserById";

export function makeGetUserByIdUseCase() {
    const getUserByIdRepository = new PrismaUsersRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    return getUserByIdUseCase
}