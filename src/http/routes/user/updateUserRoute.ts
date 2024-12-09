import { updateUser } from "@/http/controller/users/updateUser";
import { Router } from "express";

const updateUserRouter = Router()

updateUserRouter.put('/update/:id', async (req, res, next) => {
    await updateUser(req, res, next);
});

export { updateUserRouter };