import { Router } from "express";
import PatientController from "../controller/patientController.js";

const router = Router()

router
    .get("/patient", PatientController.findPatient)
    .get("/patient/:cpf", PatientController.findPatientByCpf)
    .post("/patient", PatientController.createPatient)
    .delete("/patient/:cpf", PatientController.deletePatient)

export default router