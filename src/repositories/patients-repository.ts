import { Patient, Prisma } from "@prisma/client";
import { IPagination } from "./interfaces/pagination";
import { IUpdatedPatientDTO } from "./dto/patient-dto";

export interface PatientsRepository {
  create(data: Prisma.PatientCreateInput): Promise<Patient>;
  getAll(
    data: IPagination
  ): Promise<{ total: number; patients: Patient[]; totalPage?: number }>;
  findByCpf(cpf: string): Promise<Patient | null>;
  findById(id: string): Promise<Patient | null>;
  update(data: IUpdatedPatientDTO): Promise<Patient>;
  delete(id: string): Promise<void>;
}
