import { Router } from "express";
import { registerUserRouter } from "./userRegisterRoute";
import { authRouter } from "./authRoute";
import { getAllRouter } from "./getAllRoute";
import { getUserByIdRouter } from "./getUserByIdRoute";
import { deleteUserRouter } from "./deleteUserRoute";


const router = Router();

router.use('/user', registerUserRouter);
router.use('/auth', authRouter);
router.use('/users', getAllRouter);
router.use('/user/:id', getUserByIdRouter);
router.use('/user', deleteUserRouter);


export { router };
