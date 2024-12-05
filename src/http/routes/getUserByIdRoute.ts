import { Router } from "express";
import { getUserById } from "../controller/users/getUserById";


const getUserByIdRouter = Router()

getUserByIdRouter.get('/', async (req, res, next) => {
    await getUserById(req, res, next);
});

export { getUserByIdRouter };