import { Prisma, Patient } from "@prisma/client";
import { IPagination } from "../interfaces/pagination";
import { PatientsRepository } from "../patients-repository";

export class InMemoryPatientsRepository implements PatientsRepository {
    public items: Patient[] = []
    async create(data: Prisma.PatientCreateInput) {
        const doctorId = data.doctor?.connect?.id
        const patient: Patient = {
            id: data.id || 'patient-01',
            name: data.name,
            cpf: data.cpf,
            email: data.email,
            phone: data.phone,
            doctorId: doctorId || 'default-doctor-id',
            created_at: new Date(),
            updated_at: new Date()
        }

        this.items.push(patient)

        return patient
    }
    async getAll(data: IPagination) {
        const take = data.take || 10;
        const skip = data.skip || 0;

        const startIndex = skip;
        const endIndex = skip + take;

        const total = this.items.length;
        const totalPage = Math.ceil(total / take);

        const patients = this.items.slice(startIndex, endIndex);

        return { total, patients, totalPage };
    }
    async findByCpf(cpf: string) {
        const patient = this.items.find((item) => item.cpf === cpf)

        if (!cpf) {
            return null
        }

        return patient || null
    }
    async findById(id: string) {
        const patinet = this.items.find((item) => item.id === id)

        if (!id) {
            return null
        }

        return patinet || null
    }
    async delete(id: string) {
        this.items.findIndex((item) => item.id === id)
    }

}