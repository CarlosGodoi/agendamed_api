import { DoctorsRepository } from "@/repositories/doctors-repository";
import { AppError } from "@/utils/errors/AppError";

export class DeleteDoctorUseCase {
  constructor(private doctorsRepository: DoctorsRepository) {}

  async execute(id: string): Promise<void> {
    const doctorExists = await this.doctorsRepository.findById(id);

    if (!doctorExists) {
      throw new AppError("error", "Doctor not found.");
    }

    await this.doctorsRepository.delete(id);
  }
}
