import { deleteDoctorController } from "@/http/controller/doctor/deleteDoctor";
import { Router } from "express";

const deleteDoctorRouter = Router();

deleteDoctorRouter.delete("/delete/:id", async (req, res, next) => {
  await deleteDoctorController(req, res, next);
});

export { deleteDoctorRouter };
