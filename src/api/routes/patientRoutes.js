import { Router } from "express";
import PatientController from "../controllers/patientController.js";
import authenticateMedic from "../middlewares/authenticateMedic.js";
import authenticateMedicOrOwnPatient from "../middlewares/authenticateMedicOrOwnPatient.js";

const router = Router();

router.get("/patient", authenticateMedic, PatientController.find);
router.get(
  "/patient/:id",
  authenticateMedicOrOwnPatient,
  PatientController.findById
);
router.put(
  "/patient/:id",
  authenticateMedicOrOwnPatient,
  PatientController.update
);
router.post("/patient/login", PatientController.login);
router.post("/patient/register", PatientController.register);
router.post("/patient/logout", PatientController.logout);
router.delete(
  "/patient/:id",
  authenticateMedicOrOwnPatient,
  PatientController.delete
);

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
  authenticateMedicOrOwnPatient,
  PatientController.findAllMedicines
);
router.get(
  "/patient/:patientId/medicine/:medicineId",
  authenticateMedicOrOwnPatient,
  PatientController.findMedicineById
);
router.delete(
  "/patient/:patientId/medicine/:medicineId",
  authenticateMedic,
  PatientController.deleteMedicine
);

export default router;
