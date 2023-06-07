import mongoose from "mongoose";

export const ExamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hour: { type: String, required: true },
  date: { type: String, required: true },
  address: { type: String, required: true },
});
