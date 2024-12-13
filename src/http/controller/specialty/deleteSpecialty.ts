import { makeDeleteSpecialtyUseCase } from "@/use-cases/factories/make-delete-specialty-use-case"
import { AppError } from "@/utils/errors/AppError"
import { NextFunction, Request, Response } from "express"

export async function deleteSpecialtyController(req: Request, res: Response, next: NextFunction) {
    try {
        const deleteSpecialtyUseCase = makeDeleteSpecialtyUseCase()

        const { id } = req.params as { id: string }

        await deleteSpecialtyUseCase.execute(id)
    } catch (error) {
        if (error instanceof AppError) {
            res.status(404).send({ message: error.message })
        }

        throw error
    }

    return res.status(200).send()
}