import { Router } from "express";

import { authRouter } from "./user/authRoute";
import { getAllRouter } from "./user/getAllRoute";
import { getUserByIdRouter } from "./user/getUserByIdRoute";
import { deleteUserRouter } from "./user/deleteUserRoute";
import { updateUserRouter } from "./user/updateUserRoute";
import { registerUserRouter } from "./user/userRegisterRoute";
import { registerDoctorRouter } from "./doctor/registerDoctorRoute";
import { getallSpecialtiesRouter } from "./specialty/getAllSpecialtiesRoute";


const router = Router();

router.use('/user', registerUserRouter);
router.use('/auth', authRouter);
router.use('/users', getAllRouter);
router.use('/user/:id', getUserByIdRouter);
router.use('/user', updateUserRouter);
router.use('/user', deleteUserRouter);

router.use('/specialties', getallSpecialtiesRouter)

router.use('/doctor', registerDoctorRouter)

export { router };
