import { deleteSpecialtyController } from "@/http/controller/specialty/deleteSpecialty";
import { Router } from "express";

const deleteSpecialtyRouter = Router();

deleteSpecialtyRouter.delete("/delete/:id", async (req, res, next) => {
  await deleteSpecialtyController(req, res, next);
});

export { deleteSpecialtyRouter };
