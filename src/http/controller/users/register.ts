import { NextFunction, Request, Response } from "express";
import { registerBodySchema } from "./schemas/userSchema";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { AppError } from "@/utils/errors/AppError";

export async function register(req: Request, res: Response, next: NextFunction) {

    const { name, email, cpf, role, password } = registerBodySchema.parse(req.body)

    try {
        const registerUseCase = makeRegisterUseCase()

        const user = await registerUseCase.execute({
            name,
            email,
            cpf,
            role,
            password
        })

        return res.status(200).json(user)
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(400).json({ error: error.message })
        } else {
            console.error(error)
            return res.status(500).json({ error: 'Internal server error.' })
        }
    }
}