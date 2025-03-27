import { IAppointmentsParamsGetAll } from "@/repositories/prisma/prisma-appointments-repository";
import { makeGetAllAppointmentsUseCase } from "@/use-cases/factories/make-get-all-appointments-use-case";
import { Request, Response, NextFunction } from "express";

export async function getAllAppointmentsController(
  req: Request,
  res: Response,
  nex: NextFunction
) {
  try {
    const { take, skip, total, totalPage, appointments } =
      req.query as unknown as IAppointmentsParamsGetAll;

    const getAllAppointments = makeGetAllAppointmentsUseCase();

    const result = await getAllAppointments.execute({
      take: take ? +take : 10,
      skip: skip ? +skip : 1,
      appointments,
      total,
      totalPage,
    });

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Não foi possível buscar a lista de médicos" });
  }
}
