import { IAppointmentsReportsParams } from "@/repositories/prisma/prisma-appointments-repository";
import { makeAppointmentsReportsUseCase } from "@/use-cases/factories/make-appointments-reports-use-case";
import { NextFunction, Request, Response } from "express";

export async function getAppointmentsReportsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Extrai parâmetros da query e converte corretamente
    const year = req.query.year ? Number(req.query.year) : undefined;

    // Monta o objeto de filtros
    const filters: IAppointmentsReportsParams = { year };

    // Obtém o use case
    const getAppointmentsReports = makeAppointmentsReportsUseCase();

    // Chama o método execute passando os filtros
    const result = await getAppointmentsReports.execute(filters);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao obter relatório de consultas:", error);
    return res
      .status(500)
      .json({ error: "Não foi possível obter os dados do relatório." });
  }
}
