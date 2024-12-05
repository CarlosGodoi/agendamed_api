import { Router } from "express";
import { registerUserRouter } from "./userRegisterRoute";
import { authRouter } from "./authRoute";
import { getAllRouter } from "./getAllRoute";
import { getUserByIdRouter } from "./getUserByIdRoute";


const router = Router();

router.use('/user', registerUserRouter);
router.use('/users', getAllRouter);
router.use('/user/:id', getUserByIdRouter);
router.use('/auth', authRouter);


export { router };
