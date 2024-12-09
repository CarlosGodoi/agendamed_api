import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UpdateUserUserCase } from "../users/updateUser";

export function makeUpdateUserUseCase() {
    const updateUserRepository = new PrismaUsersRepository()
    const updateUserUseCase = new UpdateUserUserCase(updateUserRepository)

    return updateUserUseCase
}