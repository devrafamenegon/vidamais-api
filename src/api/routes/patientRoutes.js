import { Router } from "express";
import PatientController from "../controllers/patientController.js";
import authenticateMedic from "../middlewares/authenticateMedic.js";

const router = Router();

router.get("/patient", PatientController.findPatient);
router.get("/patient/:id", PatientController.findPatientById);
router.post("/patient/login", PatientController.loginPatient);
router.post("/patient/register", PatientController.registerPatient);
router.post("/patient/logout", PatientController.logoutPatient);
router.delete("/patient/:id", PatientController.deletePatient);

// Rotas para manipulação de medicamentos
router.post(
  "/patient/:patientId/medicine",
  authenticateMedic,
  PatientController.addMedicine
);
router.put(
  "/patient/:patientId/medicine/:medicineId",
  authenticateMedic,
  PatientController.updateMedicine
);
router.get(
  "/patient/:patientId/medicine",
  authenticateMedic,
  PatientController.findAllMedicines
);
router.get(
  "/patient/:patientId/medicine/:medicineId",
  authenticateMedic,
  PatientController.findMedicineById
);
router.delete(
  "/patient/:patientId/medicine/:medicineId",
  authenticateMedic,
  PatientController.deleteMedicine
);

export default router;
