import { makeGetAppointmentByIdUseCase } from "@/use-cases/factories/make-get-appointment-by-id-use-case"
import { Request, Response, NextFunction } from "express"

export async function getAppointmentByIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const GetAppointmentByIdUseCase = makeGetAppointmentByIdUseCase()

        const { id } = req.params as { id: string }

        const appointment = await GetAppointmentByIdUseCase.execute(id)

        return res.status(200).send({ appointment })
    } catch (error) {
        if (error) {
            return res.status(409).send({ message: error })
        }
        throw error
    }
}