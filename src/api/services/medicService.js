import medicSchema from "../models/medic.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class MedicService {
  static async findMedicByEmailOrCRM(email, crm) {
    return medicSchema.findOne({ $or: [{ email }, { crm }] });
  }

  static async createMedic(name, email, crm, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newMedic = new medicSchema({
      name,
      email,
      crm,
      password: hashedPassword,
    });
    await newMedic.save();
  }

  static async findMedicByEmail(email) {
    return medicSchema.findOne({ email });
  }

  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET);
  }

  static async findAllMedics() {
    return medicSchema.find({});
  }

  static async findMedicById(id) {
    return medicSchema.findById(id);
  }

  static async deleteMedic(id) {
    await medicSchema.findByIdAndDelete(id);
  }
}

export default MedicService;
