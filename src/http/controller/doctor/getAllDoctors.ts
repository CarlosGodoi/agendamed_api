import { IDoctorsParamsGetAll } from "@/repositories/prisma/prisma-doctors-repository";
import { makeGetAllDoctorUseCase } from "@/use-cases/factories/make-get-all-doctors-use-case";
import { NextFunction, Request, Response } from "express";

export async function getAllDoctorsController(req: Request, res: Response, nex: NextFunction) {
    try {
        const { take, skip, total, totalPage, doctors } = req.query as unknown as IDoctorsParamsGetAll

        const getAllDoctorsUseCase = makeGetAllDoctorUseCase()

        const result = await getAllDoctorsUseCase.execute({
            take: take ? +take : 10,
            skip: skip ? +skip : 1,
            doctors,
            total,
            totalPage
        })

        return res.status(200).json(result)

    } catch (error) {
        return res.status(404).json({ error: 'Não foi possível buscar a lista de médicos' });
    }
}