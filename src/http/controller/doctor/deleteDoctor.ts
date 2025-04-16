import { makeDeleteDoctorUseCase } from "@/use-cases/factories/make-doctor-delete-use-case";
import { AppError } from "@/utils/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function deleteDoctorController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const deleteDoctorUseCase = makeDeleteDoctorUseCase();

    const { id } = req.params as { id: string };

    await deleteDoctorUseCase.execute(id);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(404).send({ message: error.message });
    }

    throw error;
  }

  return res.status(200).send();
}
