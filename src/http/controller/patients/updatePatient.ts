import { NextFunction, Request, Response } from "express";
import { updatePatientSchema } from "./schema/updatePatientSchema";
import { makeUpdatePatientUseCase } from "@/use-cases/factories/make-update-patient-use-case";

export async function updatePatientController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, phone } = updatePatientSchema.parse(req.body);

  try {
    const updatePatientUseCase = makeUpdatePatientUseCase();

    const { id } = req.params as { id: string };

    await updatePatientUseCase.execute({
      id,
      name,
      email,
      phone,
      updated_at: new Date(),
    });
  } catch (error) {
    if (error) {
      return res.status(409).send({ message: error });
    }
    throw error;
  }

  return res.status(200).send();
}
