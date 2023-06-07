import mongoose from "mongoose";
import { MedicineSchema } from "./medicine.js";
import { ExamSchema } from "./exam.js";
import { ConsultationSchema } from "./consultation.js";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    cpf: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    birthdate: { type: Date, require: true },
    medicines: [MedicineSchema],
    exams: [ExamSchema],
    consultations: [ConsultationSchema],
  },
  {
    versionKey: false,
  }
);

const patientSchema = mongoose.model("patients", PatientSchema);

export default patientSchema;
