import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  name: {type: String, require: true},
  cpf: {type: String, unique: true, require: true},
  email: {type: String, unique: true, require: true},
  password: {type: String, require: true}
},
{
  versionKey: false
}
)

const patientSchema = mongoose.model('patients', PatientSchema)

export default patientSchema