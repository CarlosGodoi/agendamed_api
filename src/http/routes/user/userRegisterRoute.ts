import { Router } from "express";
import { validateAuthUser } from "@/http/middlewares/verify-user-role";
import { register } from "@/http/controller/users/register";
import { app } from "@/config/app";

const registerUserRouter = Router();

registerUserRouter.post("/register", validateAuthUser(app), async (req, res, next) => {
    await register(req, res, next);
});

export { registerUserRouter };
