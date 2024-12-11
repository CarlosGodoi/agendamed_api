import { getAllSpecialtiesController } from "@/http/controller/doctor/getAllSpecialties";
import { Router } from "express";

const getallSpecialtiesRouter = Router();

getallSpecialtiesRouter.get("/", async (req, res, next) => {
    await getAllSpecialtiesController(req, res, next);
});

export { getallSpecialtiesRouter };