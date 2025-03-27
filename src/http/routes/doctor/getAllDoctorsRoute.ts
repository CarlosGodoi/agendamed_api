import { getAllDoctorsController } from "@/http/controller/doctor/getAllDoctors";
import { Router } from "express";

const getallDoctorsRouter = Router();

getallDoctorsRouter.get("/", async (req, res, next) => {
    await getAllDoctorsController(req, res, next);
});

export { getallDoctorsRouter };