import { PrismaDoctorsRepository } from "@/repositories/prisma/prisma-doctors-repository";
import { DeleteDoctorUseCase } from "../doctors/deleteDoctor";

export function makeDeleteDoctorUseCase() {
  const deleteDoctorRepository = new PrismaDoctorsRepository();
  const deleteDoctorUseCase = new DeleteDoctorUseCase(deleteDoctorRepository);

  return deleteDoctorUseCase;
}
