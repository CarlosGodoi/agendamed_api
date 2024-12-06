import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { DeleteUserUseCase } from "../users/deleteUser";

export function makeDeleteUSerUseCase() {
    const deleteUsersRepository = new PrismaUsersRepository()
    const deleteUserUseCase = new DeleteUserUseCase(deleteUsersRepository)

    return deleteUserUseCase
}