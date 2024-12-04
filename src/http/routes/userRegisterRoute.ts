import { Router } from "express";
import { register } from "../controller/users/register";
import { validateAuthUser } from "../middlewares/verify-user-role";
import { app } from "@/config/app";

const registerUserRouter = Router();

registerUserRouter.post("/register", validateAuthUser(app), async (req, res, next) => {
    await register(req, res, next);
});

export { registerUserRouter };
