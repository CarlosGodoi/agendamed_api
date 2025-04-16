import { registerSpecilaty } from "@/http/controller/specialty/registerSpecialty";
import { Router } from "express";

const registerSpecialtyRouter = Router();

registerSpecialtyRouter.post("/register", async (req, res, next) => {
  await registerSpecilaty(req, res, next);
});

export { registerSpecialtyRouter };
