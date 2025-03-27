import { Prisma, Specialty } from "@prisma/client";
import { IPagination } from "../interfaces/pagination";
import { SpecialtiesRepository } from "../specialty-repository";

export class InMemorySpecialtiesRepository implements SpecialtiesRepository {
    public items: Specialty[] = []

    async create(data: Prisma.SpecialtyCreateInput) {
        const specialty: Specialty = {
            id: data.id || 'specialty-01',
            name: data.name
        }

        this.items.push(specialty)

        return specialty
    }

    async getAll(data: IPagination) {
        const take = data.take || 10;
        const skip = data.skip || 0;

        const startIndex = skip;
        const endIndex = skip + take;

        const total = this.items.length;
        const totalPage = Math.ceil(total / take);

        const specialties = this.items.slice(startIndex, endIndex);

        return { total, specialties, totalPage };
    }

    async getById(id: string) {
        const specialty = this.items.find((item) => item.id === id)

        if (!id) {
            return null
        }

        return specialty || null
    }
    async findById(id: string) {
        const specialty = this.items.find((item) => item.id === id)

        if (!id) {
            return null
        }

        return specialty || null
    }

    async findByName(name: string) {
        const specialty = this.items.find((item) => item.name === name)

        if (!name) {
            return null
        }

        return specialty || null
    }

    async delete(id: string) {
        this.items.findIndex((item) => item.id === id)
    }

}