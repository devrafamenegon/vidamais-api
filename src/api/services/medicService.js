import medicSchema from "../models/medic.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { EmailCRMExistsError } from "../errors/medicErrors.js";

class MedicService {
  static async register(name, email, crm, password) {
    const existingMedic = await medicSchema.findOne({
      $or: [{ email }, { crm }],
    });
    if (existingMedic) {
      throw new EmailCRMExistsError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMedic = new medicSchema({
      name,
      email,
      crm,
      password: hashedPassword,
    });
    await newMedic.save();
  }

  static async login(email, password) {
    const medic = await medicSchema.findOne({ email });
    if (!medic) {
      throw new MedicNotFoundError();
    }

    const passwordMatch = await bcrypt.compare(password, medic.password);
    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const token = jwt.sign({ userId: medic._id }, process.env.JWT_SECRET);

    return token;
  }

  static async find() {
    return await medicSchema.find({});
  }

  static async findById(id) {
    const medic = await medicSchema.findById(id);
    if (!medic) {
      throw new MedicNotFoundError();
    }
    return medic;
  }

  static async delete(id) {
    const medic = await medicSchema.findById(id);
    if (!medic) {
      throw new MedicNotFoundError();
    }

    await patientSchema.deleteOne(id);
  }
}

export default MedicService;
