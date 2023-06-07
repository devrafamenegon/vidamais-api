import medicSchema from "../models/medic.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class MedicController {
  static registerMedic = async (req, res) => {
    const { name, email, crm, password } = req.body;

    try {
      const existingPaciente = await medicSchema.findOne({
        $or: [{ email }, { crm }],
      });
      if (existingPaciente) {
        return res
          .status(400)
          .json({ error: "Email or CRM already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newMedic = new medicSchema({
        name,
        email,
        crm,
        password: hashedPassword,
      });
      await newMedic.save();

      res.status(200).json({ message: "Medic successfully registered" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: `${err.message} - Fail to create Medic` });
    }
  };

  static loginMedic = async (req, res) => {
    const { email, password } = req.body;

    try {
      // Verifica se o paciente existe no banco de dados
      const Medic = await medicSchema.findOne({ email });
      if (!Medic) {
        return res.status(401).json({ error: "User not found" });
      }

      // Verifica a password
      const passwordMatch = await bcrypt.compare(password, Medic.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Gera o token JWT
      const token = jwt.sign({ userId: Medic._id }, process.env.JWT_SECRET);

      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `${err.message} - Error to login` });
    }
  };

  static findMedics = async (req, res) => {
    try {
      const medics = await medicSchema.find({});
      res.status(200).json(medics);
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Fail to find medic` });
    }
  };

  static findMedicById = async (req, res) => {
    try {
      const id = req.params.id;
      const medic = await medicSchema.findById(id);
      if (medic) {
        res.status(200).json(medic);
      } else {
        res.status(400).json({ message: "Medic not found" });
      }
    } catch (err) {
      res.status(400).json({ message: `${err.message} - Medic not found` });
    }
  };

  static deleteMedic = async (req, res) => {
    try {
      const id = req.params.id;
      await medicSchema.findByIdAndDelete(id);
      res.status(200).json({ message: "Medic removed successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default MedicController;
