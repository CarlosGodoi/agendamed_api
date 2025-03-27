import { Role, User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users-repository";
import { hash } from "bcrypt";
import { AppError } from "../../utils/errors/AppError";

interface IRegisterUseCaseRequest {
    name: string;
    email: string;
    cpf: string;
    password: string;
    role: Role;
}

interface IRegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        name,
        email,
        cpf,
        password,
        role,
    }: IRegisterUseCaseRequest): Promise<IRegisterUseCaseResponse> {
        try {
            const password_hash = await hash(password, 6);

            const emailExists = await this.usersRepository.findByEmail(email);

            if (emailExists) {
                throw new AppError('email', 'Este email já está em uso');
            }

            const user = await this.usersRepository.create({
                name,
                email,
                cpf,
                role,
                password: password_hash,
            });

            return { user };
        } catch (error) {
            console.error('Erro no RegisterUseCase:', error);
            throw error;
        }
    }

}