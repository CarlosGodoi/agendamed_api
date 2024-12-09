import { Router } from "express";

import { authRouter } from "./user/authRoute";
import { getAllRouter } from "./user/getAllRoute";
import { getUserByIdRouter } from "./user/getUserByIdRoute";
import { deleteUserRouter } from "./user/deleteUserRoute";
import { updateUserRouter } from "./user/updateUserRoute";
import { registerUserRouter } from "./user/userRegisterRoute";
import { registerSpecialtyRouter } from "./specialty/registerSpecialtuRoute";


const router = Router();

router.use('/user', registerUserRouter);
router.use('/auth', authRouter);
router.use('/users', getAllRouter);
router.use('/user/:id', getUserByIdRouter);
router.use('/user', updateUserRouter);
router.use('/user', deleteUserRouter);

router.use('/specialty', registerSpecialtyRouter)

export { router };
