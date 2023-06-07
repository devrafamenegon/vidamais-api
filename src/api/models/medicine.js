import mongoose from "mongoose";

export const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hour: { type: String, required: true },
  qtd: { type: Number, required: true },
  type: { type: String, required: true },
  frequency: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  doctorId: { type: String, required: true },
});
