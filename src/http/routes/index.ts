import { Router } from "express";
import { registerUserRouter } from "./userRegisterRoute";
import { authRouter } from "./authRoute";
import { getAllRouter } from "./getAllRoute";


const router = Router();

router.use('/user', registerUserRouter);
router.use('/users', getAllRouter);
router.use('/auth', authRouter);


export { router };
