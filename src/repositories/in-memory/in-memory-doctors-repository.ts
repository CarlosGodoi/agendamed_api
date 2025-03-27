import { Prisma, Doctor } from "@prisma/client";
import { DoctorsRepository } from "../doctors-repository";
import { IPagination } from "../interfaces/pagination";

export class InMemoryDoctorsRepository implements DoctorsRepository {
    public items: Doctor[] = []
    async create(data: Prisma.DoctorCreateInput) {
        const specialtyId = data.specialty?.connect?.id;

        const doctor: Doctor = {
            id: data.id || 'user-01',
            name: data.name,
            cpf: data.cpf,
            crm: data.crm,
            specialtyId: specialtyId || 'default-specialty-id',
            created_at: new Date(),
            updated_at: new Date(),
        };

        this.items.push(doctor);

        return doctor;
    }

    async getAll(data: IPagination) {
        const take = data.take || 10;
        const skip = data.skip || 0;

        const startIndex = skip;
        const endIndex = skip + take;

        const total = this.items.length;
        const totalPage = Math.ceil(total / take);

        const doctors = this.items.slice(startIndex, endIndex);

        return { total, doctors, totalPage };
    }

    async getById(id: string) {
        const doctor = this.items.find((item) => item.id === id)

        if (!id) {
            return null
        }

        return doctor || null
    }

    async findById(id: string) {
        const doctor = this.items.find((item) => item.id === id)

        if (!id) {
            return null
        }

        return doctor || null
    }
    async findByName(name: string) {
        const doctor = this.items.find((item) => item.name === name)

        if (!name) {
            return null
        }

        return doctor || null
    }

    async findByCpf(cpf: string) {
        const doctor = this.items.find((item) => item.cpf === cpf)

        if (!cpf) {
            return null
        }

        return doctor || null
    }

    async delete(id: string) {
        this.items.findIndex((item) => item.id === id)
    }

}