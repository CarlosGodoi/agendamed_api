import { getUserById } from "@/http/controller/users/getUserById";
import { Router } from "express";

const getUserByIdRouter = Router();

getUserByIdRouter.get("/:id", async (req, res, next) => {
  await getUserById(req, res, next);
});

export { getUserByIdRouter };
