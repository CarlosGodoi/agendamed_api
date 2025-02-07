import { getAllAppointmentsController } from "@/http/controller/appointment/getAllAppointments";
import { Router } from "express";

const getAllAppointmentsRouter = Router();

getAllAppointmentsRouter.get("/", async (req, res, next) => {
  await getAllAppointmentsController(req, res, next);
});

export { getAllAppointmentsRouter };
