import { verify } from "jsonwebtoken";
import isTokenBlacklisted from "../utils/isTokenBlacklisted.js";
import medicSchema from "../models/medic.js";

// Middleware de autenticação de médicos
export default async function authenticateMedic(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Verifique se o token está na lista negra
    if (isTokenBlacklisted(token) === true) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Verifique e decodifique o token JWT
    const decodedToken = verify(token, process.env.JWT_SECRET);

    // Verifica se o médico existe no banco de dados
    const medic = await medicSchema.findById(decodedToken.userId);
    if (medic === null) {
      return res.status(401).json({ error: "Only medics are allowed" });
    }

    // Defina o ID do usuário autenticado no objeto de solicitação (req)
    req.userId = decodedToken.userId;

    // Defina que é um médico
    req.isMedic = true;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to authenticate" });
  }
}
