import { Prisma, User } from "@prisma/client";
import { IPagination } from "./interfaces/pagination";

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    getAll(data: IPagination): Promise<{ total: number; users: User[]; totalPage?: number }>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    delete(id: string): Promise<void>
}