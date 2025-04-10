import { PrismaPatientsRespository } from "@/repositories/prisma/prisma-patients-repository";
import { UpdatePatientUseCase } from "../patient/updatePatient";

export function makeUpdatePatientUseCase() {
  const updatePatientRepository = new PrismaPatientsRespository();
  const updatePatientUseCase = new UpdatePatientUseCase(
    updatePatientRepository
  );

  return updatePatientUseCase;
}
