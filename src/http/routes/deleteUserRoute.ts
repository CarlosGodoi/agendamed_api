import { Router } from "express";
import { deleteUser } from "../controller/users/deleteUser";

const deleteUserRouter = Router()

deleteUserRouter.delete('/delete/:id', async (req, res, next) => {
    await deleteUser(req, res, next);
});

export { deleteUserRouter };