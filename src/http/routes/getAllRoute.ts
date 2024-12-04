import { Router } from "express";
import { getAllUsers } from "../controller/users/getAllUsers";

const getAllRouter = Router()

getAllRouter.get('/', async (req, res, next) => {
    await getAllUsers(req, res, next);
});

export { getAllRouter };