import { SpecialtiesRepository } from "@/repositories/specialty-repository";
import { AppError } from "@/utils/errors/AppError";
import { Prisma, Specialty } from "@prisma/client";

interface IRegisterSpecialtyUseCaseRequest {
  id?: string;
  name: string;
}

interface IRegisterSpecialtyUseCaseResponse {
  specialty: Specialty;
}

export class RegisterSpecialtyUseCase {
  constructor(private specialtyRepository: SpecialtiesRepository) {}

  async execute({
    id,
    name,
  }: IRegisterSpecialtyUseCaseRequest): Promise<IRegisterSpecialtyUseCaseResponse> {
    try {
      const specialtyExists = await this.specialtyRepository.findByName(name);

      if (specialtyExists) {
        throw new AppError("error", "This specialty already exists");
      }

      const specialty = await this.specialtyRepository.create({
        name,
      });
      return { specialty };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new AppError("error", "Specialty name must be unique");
      }
      console.error("Erro no RegisterSpecialtyUseCase:", error);
      throw error;
    }
  }
}
