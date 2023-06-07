import mongoose from "mongoose";

export const ConsultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hour: { type: String, required: true },
  date: { type: String, required: true },
  address: { type: String, required: true },
  doctorName: { type: String, required: true },
});
