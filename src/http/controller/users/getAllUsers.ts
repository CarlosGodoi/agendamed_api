import { Request, Response, NextFunction } from "express";
import { makeGetAllUsersUseCase } from "@/use-cases/factories/make-get-all-users-use-case";
import { IUsersParamsGetAll } from "@/repositories/prisma/prisma-users-repository";

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const { skip, take, total, totalPage, users } = req.query as unknown as IUsersParamsGetAll;

        const getAllUsersUseCase = makeGetAllUsersUseCase();

        const result = await getAllUsersUseCase.execute({
            take: take ? +take : 10,
            skip: skip ? +skip : 1,
            users,
            total,
            totalPage
        });

        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({ error: 'Não foi possível buscar a lista de usuários' });
    }
}