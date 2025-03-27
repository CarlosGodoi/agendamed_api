import { Router } from "express";

import { authRouter } from "./user/authRoute";
import { getAllRouter } from "./user/getAllRoute";
import { getUserByIdRouter } from "./user/getUserByIdRoute";
import { deleteUserRouter } from "./user/deleteUserRoute";
import { updateUserRouter } from "./user/updateUserRoute";
import { registerUserRouter } from "./user/userRegisterRoute";
import { registerDoctorRouter } from "./doctor/registerDoctorRoute";
import { getallSpecialtiesRouter } from "./specialty/getAllSpecialtiesRoute";
import { getallDoctorsRouter } from "./doctor/getAllDoctorsRoute";
import { registerAppointmentRouter } from "./appointment/registerAppointmentRoute";
import { updateAppointmentStatusRouter } from "./appointment/updateAppointmentStatusRoute";
import { getAllPatientsRouter } from "./patient/getAllPatientsRoute";
import { getPatientByIdRouter } from "./patient/getPatientByIdRoute";
import { getAppointmentByIdRouter } from "./appointment/getAppointmentByIdRoute";
import { getAllAppointmentsRouter } from "./appointment/getAllAppointments";
import { getAppointmentsReportsRouter } from "./appointment/getAppointmentsReports";

const router = Router();

router.use("/user", registerUserRouter);
router.use("/auth", authRouter);
router.use("/users", getAllRouter);
router.use("/user/:id", getUserByIdRouter);
router.use("/user", updateUserRouter);
router.use("/user", deleteUserRouter);

router.use("/patients", getAllPatientsRouter);
router.use("/patient/:id", getPatientByIdRouter);

router.use("/specialties", getallSpecialtiesRouter);

router.use("/doctor", registerDoctorRouter);
router.use("/doctors", getallDoctorsRouter);

router.use(
  "/appointments",
  registerAppointmentRouter,
  updateAppointmentStatusRouter,
  getAllAppointmentsRouter,
  getAppointmentsReportsRouter
);
router.use("/appointment", getAppointmentByIdRouter);

export { router };
