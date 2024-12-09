import { IUpdatedUserDTO } from "@/repositories/dto/user-dto";
import { UsersRepository } from "@/repositories/users-repository";
import { AppError } from "@/utils/errors/AppError";
import { User } from "@prisma/client";
import { hash } from "bcrypt";


export class UpdateUserUserCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        id,
        email,
        password,
        updated_at
    }: IUpdatedUserDTO): Promise<User> {
        const userExists = await this.usersRepository.findById(id || '')

        if (!userExists) {
            throw new AppError('error', 'User not Found')
        }

        const newPasswordHashed = await hash(password, 6)

        const updatedUser = await this.usersRepository.update({
            id: userExists.id,
            email,
            password: newPasswordHashed,
            updated_at: new Date() || updated_at,
        })

        return updatedUser
    }
}