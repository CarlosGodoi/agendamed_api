import { IPatientsParamsGetAll } from "@/repositories/prisma/prisma-patients-repository";
import { makeGetAllPatientsUseCase } from "@/use-cases/factories/make-get-all-patients-use-case";
import { Request, Response, NextFunction } from "express";

export async function getAllPatientsController(req: Request, res: Response, next: NextFunction) {
    try {
        const { skip, take, total, totalPage, patients } = req.query as unknown as IPatientsParamsGetAll;

        const getAllPatientsUseCase = makeGetAllPatientsUseCase();

        const result = await getAllPatientsUseCase.execute({
            take: take ? +take : 10,
            skip: skip ? +skip : 1,
            patients,
            total,
            totalPage
        });

        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({ error: 'Não foi possível buscar a lista de pacientes' });
    }
}