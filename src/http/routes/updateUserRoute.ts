import { Router } from "express";
import { updateUser } from "../controller/users/updateUser";


const updateUserRouter = Router()

updateUserRouter.put('/update/:id', async (req, res, next) => {
    await updateUser(req, res, next);
});

export { updateUserRouter };