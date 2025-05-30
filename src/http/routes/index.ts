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
import { updatePatientRouter } from "./patient/updatePatientRoute";
import { registerSpecialtyRouter } from "./specialty/registerSpecialtuRoute";
import { deleteSpecialtyRouter } from "./specialty/deleteSpecialty";
import { deleteDoctorRouter } from "./doctor/deleteDoctorRoute";

const router = Router();

router.use("/user", registerUserRouter);
router.use("/auth", authRouter);
router.use("/users", getAllRouter);
router.use("/user", getUserByIdRouter);
router.use("/user", updateUserRouter);
router.use("/user", deleteUserRouter);

router.use("/patients", getAllPatientsRouter);
router.use("/patient", getPatientByIdRouter);
router.use("/patient", updatePatientRouter);

router.use("/specialties", getallSpecialtiesRouter);
router.use("/specialties", registerSpecialtyRouter);
router.use("/specialty", deleteSpecialtyRouter);

router.use("/doctor", registerDoctorRouter);
router.use("/doctors", getallDoctorsRouter);
router.use("/doctor", deleteDoctorRouter);

router.use(
  "/appointments",
  registerAppointmentRouter,
  updateAppointmentStatusRouter,
  getAllAppointmentsRouter,
  getAppointmentsReportsRouter
);
router.use("/appointment", getAppointmentByIdRouter);

export { router };
