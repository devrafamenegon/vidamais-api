import { Router } from "express";
import medicController from "../controllers/medicController.js";

const router = Router();

router
  .get("/medic", medicController.find)
  .get("/medic/:id", medicController.findById)
  .post("/medic/login", medicController.login)
  .post("/medic/register", medicController.register)
  .delete("/medic/:id", medicController.delete);

export default router;
