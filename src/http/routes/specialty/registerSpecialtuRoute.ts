import { registerSpecilaty } from "@/http/controller/specialty/specialty";
import { Router } from "express";

const registerSpecialtyRouter = Router();

registerSpecialtyRouter.post("/register", async (req, res, next) => {
    await registerSpecilaty(req, res, next);
});

export { registerSpecialtyRouter };