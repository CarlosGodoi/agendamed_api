import { getPatientByIdController } from "@/http/controller/patients/getPatientById";
import { Router } from "express";

const getPatientByIdRouter = Router()

getPatientByIdRouter.get('/', async (req, res, next) => {
    await getPatientByIdController(req, res, next);
});

export { getPatientByIdRouter };