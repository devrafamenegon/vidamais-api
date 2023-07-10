import { verify } from "jsonwebtoken";
import medicSchema from "../models/medic.js";
import patientSchema from "../models/patient.js";
import isTokenBlacklisted from "../utils/isTokenBlacklisted.js";

// Middleware para verificar se é um médico ou o próprio paciente
export default async function authenticateMedicOrOwnPatient(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (isTokenBlacklisted(token) === true) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Decodifique o token JWT
    const decodedToken = verify(token, process.env.JWT_SECRET);

    // Verifique se é um médico
    const medic = await medicSchema.findById(decodedToken.userId);
    if (medic !== null) {
      req.isMedic = true;
    } else {
      req.isMedic = false;
    }

    // Verifique se é o próprio paciente
    const pacient = await patientSchema.findById(decodedToken.userId);
    if (pacient !== null) {
      req.isOwnPatient = true;
    } else {
      req.isOwnPatient = false;
    }

    console.log(req.isOwnPatient);
    console.log(req.isMedic);

    // Verifica se é o próprio paciente ou um médico
    if (!req.isMedic && !req.isOwnPatient) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to authenticate" });
  }
}
