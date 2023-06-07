import { Router } from "express";
import medicController from "../controllers/medicController.js";

const router = Router();

router
  .get("/medic", medicController.findMedics)
  .get("/medic/:id", medicController.findMedicById)
  .post("/medic/login", medicController.loginMedic)
  .post("/medic/register", medicController.registerMedic)
  .delete("/medic/:id", medicController.deleteMedic);

export default router;
