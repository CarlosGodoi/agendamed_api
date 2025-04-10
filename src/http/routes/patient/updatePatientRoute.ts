import { updatePatientController } from "@/http/controller/patients/updatePatient";
import { Router } from "express";

const updatePatientRouter = Router();

updatePatientRouter.put("/update/:id", async (req, res, next) => {
  await updatePatientController(req, res, next);
});

export { updatePatientRouter };
