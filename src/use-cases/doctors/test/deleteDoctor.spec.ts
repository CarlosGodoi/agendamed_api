import { DoctorsRepository } from "@/repositories/doctors-repository";
import { RegisterDoctorUseCase } from "../registerDoctor";
import { DeleteDoctorUseCase } from "../deleteDoctor";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryDoctorsRepository } from "@/repositories/in-memory/in-memory-doctors-repository";
import { SpecialtiesRepository } from "@/repositories/specialty-repository";
import { InMemorySpecialtiesRepository } from "@/repositories/in-memory/in-memory-specialties-repository";
import { RegisterSpecialtyUseCase } from "@/use-cases/specialty/register";

let doctorsRepository: DoctorsRepository;
let specialtyRepository: SpecialtiesRepository;
let sut: RegisterDoctorUseCase;
let sut2: RegisterSpecialtyUseCase;

let deleteDoctorUseCase: DeleteDoctorUseCase;

describe("Delete Doctor Use Case", () => {
  beforeEach(() => {
    doctorsRepository = new InMemoryDoctorsRepository();
    specialtyRepository = new InMemorySpecialtiesRepository();
    sut = new RegisterDoctorUseCase(doctorsRepository, specialtyRepository);
    sut2 = new RegisterSpecialtyUseCase(specialtyRepository);

    deleteDoctorUseCase = new DeleteDoctorUseCase(doctorsRepository);
  });

  it("should be able to delete doctor", async () => {
    const { specialty } = await sut2.execute({
      name: "Specialty-001",
    });

    const { doctor } = await sut.execute({
      name: "doctor-test",
      cpf: "009.898.123-00",
      crm: "CRM/SP 00234",
      specialtyId: specialty.id,
    });

    expect(() => deleteDoctorUseCase.execute(doctor.id));
  });
});
