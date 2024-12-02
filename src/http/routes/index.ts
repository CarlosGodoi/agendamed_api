import { Router } from "express";
import { registerUserRouter } from "./userRegisterRoute";
import { authRouter } from "./authRoute";


const router = Router();

router.use('/user', registerUserRouter);
router.use('/auth', authRouter);


export { router };
