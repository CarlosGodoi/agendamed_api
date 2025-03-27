import { getAppointmentByIdController } from "@/http/controller/appointment/getAppointmentById";
import { Router } from "express";

const getAppointmentByIdRouter = Router()

getAppointmentByIdRouter.get('/:id', async (req, res, next) => {
    await getAppointmentByIdController(req, res, next);
});

export { getAppointmentByIdRouter };