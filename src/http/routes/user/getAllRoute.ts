import { getAllUsers } from "@/http/controller/users/getAllUsers";
import { Router } from "express";

const getAllRouter = Router()

getAllRouter.get('/', async (req, res, next) => {
    await getAllUsers(req, res, next);
});

export { getAllRouter };