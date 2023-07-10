import { verify } from "jsonwebtoken";
import patientSchema from "../models/patient.js";

// Middleware de autenticação de pacientes
export default async function authenticatePatient(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Verifique se o token está na lista negra
    if (isTokenBlacklisted(token) === true) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Verifique e decodifique o token JWT
    const decodedToken = verify(token, process.env.JWT_SECRET);

    // Verifica se o paciente existe no banco de dados
    const Patient = await patientSchema.findById(decodedToken.userId);
    if (!Patient) {
      return res.status(401).json({ error: "Only patients are allowed" });
    }

    // Defina o ID do usuário autenticado no objeto de solicitação (req)
    req.userId = decodedToken.userId;

    // Defina que é um paciente
    req.isPatient = true;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to authenticate" });
  }
}
