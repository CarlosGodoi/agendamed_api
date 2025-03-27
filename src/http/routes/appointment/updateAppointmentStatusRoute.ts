import { updateAppointmentStatusController } from "@/http/controller/appointment/updateAppointmentStatus";
import { Router } from "express";

const updateAppointmentStatusRouter = Router();

updateAppointmentStatusRouter.patch("/:appointmentId/status", async (req, res, next) => {
    await updateAppointmentStatusController(req, res, next);
});

export { updateAppointmentStatusRouter };