import { ISpecialtiesParamsGetAll } from "@/repositories/prisma/prisma-specialties.repository";
import { makeGetAllSpecialtiesUseCase } from "@/use-cases/factories/make-get-all-specialties-use-case";
import { NextFunction, Request, Response } from "express";

export async function getAllSpecialtiesController(req: Request, res: Response, next: NextFunction) {

    try {
        const { skip, take, total, totalPage, specialties } = req.query as unknown as ISpecialtiesParamsGetAll

        const getAllSpecialtiesUseCase = makeGetAllSpecialtiesUseCase()

        const result = await getAllSpecialtiesUseCase.execute({
            take: take ? +take : 10,
            skip: skip ? +skip : 1,
            specialties,
            total,
            totalPage
        })

        return res.status(200).json(result)

    } catch (error) {
        return res.status(404).json({ error: 'Não foi possível buscar a lista de especialidades' });
    }
}