import { Doctor, Prisma } from "@prisma/client";
import { IPagination } from "./interfaces/pagination";

export interface DoctorsRepository {
    create(data: Prisma.DoctorCreateInput): Promise<Doctor>
    getAll(data: IPagination): Promise<{ total: number; doctors: Doctor[]; totalPage?: number }>
    getById(id: string): Promise<Doctor | null>
    findById(id: string): Promise<Doctor | null>
    findByName(name: string): Promise<Doctor | null>
    findByCpf(cpf: string): Promise<Doctor | null>
    delete(id: string): Promise<void>
}