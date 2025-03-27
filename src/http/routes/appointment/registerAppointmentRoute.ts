import { registerAppointmentController } from "@/http/controller/appointment/registerAppointment";
import { Router } from "express";

const registerAppointmentRouter = Router();

registerAppointmentRouter.post("/register", async (req, res, next) => {
    await registerAppointmentController(req, res, next);
});

export { registerAppointmentRouter };