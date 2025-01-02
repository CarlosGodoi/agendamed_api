import { getAllPatientsController } from "@/http/controller/patients/getAllPatients";
import { Router } from "express";

const getAllPatientsRouter = Router()

getAllPatientsRouter.get('/', async (req, res, next) => {
    await getAllPatientsController(req, res, next);
});

export { getAllPatientsRouter };