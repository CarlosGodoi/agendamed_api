import { getAppointmentsReportsController } from "@/http/controller/appointment/getAppointmentsReports";
import { Router } from "express";

const getAppointmentsReportsRouter = Router();

getAppointmentsReportsRouter.get("/reports", async (req, res, next) => {
  await getAppointmentsReportsController(req, res, next);
});

export { getAppointmentsReportsRouter };
