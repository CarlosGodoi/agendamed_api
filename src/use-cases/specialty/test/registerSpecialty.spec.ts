import { InMemorySpecialtiesRepository } from "@/repositories/in-memory/in-memory-specialties-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { RegisterSpecialtyUseCase } from "../register";
import { AppError } from "@/utils/errors/AppError";

let specialtyRepository: InMemorySpecialtiesRepository;
let sut: RegisterSpecialtyUseCase;

describe("Register Specialty Use Case", () => {
  beforeEach(() => {
    specialtyRepository = new InMemorySpecialtiesRepository();
    sut = new RegisterSpecialtyUseCase(specialtyRepository);
  });

  it("Should be able to register specialty", async () => {
    const { specialty } = await sut.execute({
      name: "Specialty-test",
    });

    expect(specialty.id).toEqual(expect.any(String));
  });

  it("Should not be able to register specialty with name to equal", async () => {
    await sut.execute({
      name: "Specialty-test",
    });

    await expect(() =>
      sut.execute({
        name: "Specialty-test",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
