import { NextFunction, Request, Response } from "express";
import { updateUserSchema } from "./schemas/updateUserSchema";
import { makeUpdateUserUseCase } from "@/use-cases/factories/make-update-user-use-case";

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = updateUserSchema.parse(req.body)

    try {
        const updateUserUseCase = makeUpdateUserUseCase()
        const { id } = req.params as { id: string }

        await updateUserUseCase.execute({
            id,
            email,
            password,
            updated_at: new Date()
        })
    } catch (error) {
        if (error) {
            return res.status(409).send({ message: error })
        }
        throw error
    }

    return res.status(200).send()
}