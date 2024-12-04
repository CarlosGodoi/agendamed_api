import { IUsersParamsGetAll } from "@/repositories/prisma/prisma-users-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

export class GetAllUsersUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute(pagination: IUsersParamsGetAll): Promise<{ total: number, users: User[] }> {
        const users = await this.usersRepository.getAll(pagination)

        return users
    }
}