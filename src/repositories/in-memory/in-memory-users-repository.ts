import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []


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
}