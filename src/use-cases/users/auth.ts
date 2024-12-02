import { prisma } from "@/lib/prisma"
import { UsersRepository } from "@/repositories/users-repository"
import { AppError } from "@/utils/errors/AppError"
import { User } from "@prisma/client"
import { compare } from "bcrypt"

interface IAuthenticateUseCaseResquest {
    email: string
    password: string
}

interface IAuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private userRespository: UsersRepository) { }

    async execute({
        email,
        password
    }: IAuthenticateUseCaseResquest): Promise<IAuthenticateUseCaseResponse> {
        const user = await this.userRespository.findByEmail(email)

        if (!user) {
            throw new AppError('Error', 'Invalid credentials.')
        }

        const doesPasswordMatches = await compare(password, user.password)

        if (!doesPasswordMatches) {
            throw new AppError('Error', 'Invalid credentials.')
        }

        return { user }
    }
}