import { registerDoctorWithSpecialty } from "@/http/controller/doctor/registerDoctor";
import { Router } from "express";

const registerDoctorRouter = Router();

registerDoctorRouter.post("/register", async (req, res, next) => {
    await registerDoctorWithSpecialty(req, res, next);
});

export { registerDoctorRouter };