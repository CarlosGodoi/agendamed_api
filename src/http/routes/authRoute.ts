import { Router } from "express";
import { authenticate } from "../controller/users/authenticate";

const authRouter = Router();

authRouter.post('/', async (req, res, next) => {
    await authenticate(req, res, next);
});

export { authRouter };