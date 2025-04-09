import { makeGetPatientByIdUseCase } from "@/use-cases/factories/make-get-patient-by-id-use-case";
import { AppError } from "@/utils/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function getPatientByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const GetPatientByIdUseCase = makeGetPatientByIdUseCase();

    const { id } = req.params as { id: string };

    const patient = await GetPatientByIdUseCase.execute(id);

    return res.status(200).send({ patient });
  } catch (error) {
    if (error) {
      return res.status(409).send({ message: error });
    }
    throw error;
  }
}
