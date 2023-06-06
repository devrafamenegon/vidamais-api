import { Router } from "express";
import medicController from "../controller/medicController.js";

const router = Router()

router
    .get("/medic", medicController.findMedics)
    .get("/medic/:crm", medicController.findMedicByCrm)
    .post("/medic", medicController.createMedic)
    .delete("/medic/:crm", medicController.deleteMedic)

export default router