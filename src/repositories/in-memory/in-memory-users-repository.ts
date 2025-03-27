import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { IPagination } from "../interfaces/pagination";
import { IUpdatedUserDTO } from "../dto/user-dto";
import { AppError } from "@/utils/errors/AppError";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []
    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: data.id || 'user-1',
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            role: data.role,
            created_at: new Date() || null,
            updated_at: new Date() || null,
            password: data.password
        }

        this.items.push(user)

        return user
    }

    async getAll(data: IPagination) {
        const take = data.take || 10;
        const skip = data.skip || 0;

        const startIndex = skip;
        const endIndex = skip + take;

        const total = this.items.length;
        const totalPage = Math.ceil(total / take);

        const users = this.items.slice(startIndex, endIndex);

        return { total, users, totalPage };
    }



    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email)

        if (!email) {
            return null
        }

        return user || null
    }

    async findById(id: string) {
        const user = this.items.find((item) => item.id === id)

        if (!id) {
            return null
        }

        return user || null
    }

    async update(data: IUpdatedUserDTO) {
        const existingIndex = this.items.findIndex((item) => item.id === data.id)

        if (existingIndex === -1) {
            throw new AppError('error', `User with ID ${data.id} not found.`)
        }

        const existingUser = this.items[existingIndex]
        const updatedUser: User = {
            ...existingUser,
            email: data.email || existingUser.email,
            password: data.password || existingUser.password
        }

        this.items[existingIndex] = updatedUser

        return updatedUser
    }

    async delete(id: string) {
        this.items.findIndex((item) => item.id === id)
    }
}