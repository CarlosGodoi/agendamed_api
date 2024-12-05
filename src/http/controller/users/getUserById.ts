import { makeGetUserByIdUseCase } from "@/use-cases/factories/make-get-user-by-id-use-case";
import { NextFunction, Request, Response } from "express";

export async function getUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const getUserByIdUseCase = makeGetUserByIdUseCase()

        const { id } = req.params as { id: string }

        const user = await getUserByIdUseCase.execute(id)

        return res.status(200).send({ user })
    } catch (error) {
        if (error) {
            return res.status(409).send({ message: error })
        }
        throw error
    }
}