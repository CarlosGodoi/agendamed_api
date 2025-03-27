import { Prisma, Specialty } from "@prisma/client";
import { IPagination } from "./interfaces/pagination";

export interface SpecialtiesRepository {
    create(data: Prisma.SpecialtyCreateInput): Promise<Specialty>
    getAll(data: IPagination): Promise<{ total: number; specialties: Specialty[]; totalPage?: number }>
    getById(id: string): Promise<Specialty | null>
    findById(id: string): Promise<Specialty | null>
    findByName(name: string): Promise<Specialty | null>
    delete(id: string): Promise<void>
}