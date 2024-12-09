import { deleteUser } from "@/http/controller/users/deleteUser";
import { Router } from "express";

const deleteUserRouter = Router()

deleteUserRouter.delete('/delete/:id', async (req, res, next) => {
    await deleteUser(req, res, next);
});

export { deleteUserRouter };