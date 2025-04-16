import { makeRegisterSpecialtyUseCase } from "@/use-cases/factories/make-register-specialty-use-case";
import { AppError } from "@/utils/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export async function registerSpecilaty(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const registerSpecialtyBodySchema = z.object({
    name: z
      .string()
      .min(1, { message: "Nome da especialidade obrigatório." })
      .trim(),
  });

  const { name } = registerSpecialtyBodySchema.parse(req.body);

  try {
    const registerSpecialtyUseCase = makeRegisterSpecialtyUseCase();

    const specialty = await registerSpecialtyUseCase.execute({
      name,
    });

    console.log("specialty_controller =>", specialty);

    return res.status(200).json(specialty);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}
