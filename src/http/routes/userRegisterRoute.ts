import { Router } from "express";
import { register } from "../controller/users/register";

const registerUserRouter = Router();

registerUserRouter.post('/register', async (req, res, next) => {
    await register(req, res, next);
});

export { registerUserRouter };
