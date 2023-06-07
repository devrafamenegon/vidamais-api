import mongoose from "mongoose";

const MedicSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    crm: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const medicSchema = mongoose.model("medics", MedicSchema);

export default medicSchema;
