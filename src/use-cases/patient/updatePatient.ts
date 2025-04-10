import { PatientsRepository } from "@/repositories/patients-repository";
import { IUpdatedPatientDTO } from "@/repositories/dto/patient-dto";
import { Patient } from "@prisma/client";
import { AppError } from "@/utils/errors/AppError";

export class UpdatePatientUseCase {
  constructor(private patientRepository: PatientsRepository) {}

  async execute({
    id,
    name,
    email,
    phone,
  }: IUpdatedPatientDTO): Promise<Patient> {
    const patientExists = await this.patientRepository.findById(id || "");

    if (!patientExists) {
      throw new AppError("error", "Patient not Found");
    }

    const updatedPatient = await this.patientRepository.update({
      id: patientExists.id,
      name: name || patientExists.name,
      email: email || patientExists.email,
      phone: phone || patientExists.phone,
      updated_at: new Date(),
    });

    return updatedPatient;
  }
}
