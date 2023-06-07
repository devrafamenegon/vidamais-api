import patientSchema from "../models/patient.js";
import blacklistSchema from "../models/blacklist.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  PatientNotFoundError,
  MedicineNotFoundError,
  OnlyDoctorsError,
  InvalidCredentialsError,
  EmailCPFExistsError,
} from "../errors/patientErrors.js";

class PatientService {
  static async registerPatient(name, email, cpf, password) {
    const existingPaciente = await patientSchema.findOne({
      $or: [{ email }, { cpf }],
    });
    if (existingPaciente) {
      throw new EmailCPFExistsError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new patientSchema({
      name,
      email,
      cpf,
      password: hashedPassword,
    });
    await newPatient.save();
  }

  static async loginPatient(email, password) {
    const patient = await patientSchema.findOne({ email });
    if (!patient) {
      throw new PatientNotFoundError();
    }

    const passwordMatch = await bcrypt.compare(password, patient.password);
    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const token = jwt.sign({ userId: patient._id }, process.env.JWT_SECRET);

    return token;
  }

  static async logoutPatient(token) {
    const blacklistedToken = new blacklistSchema({ token });

    await blacklistedToken.save();
  }

  static async findPatient() {
    const patients = await patientSchema.find({});
    return patients;
  }

  static async findPatientById(id) {
    const patient = await patientSchema.findById(id);
    if (!patient) {
      throw new PatientNotFoundError();
    }
    return patient;
  }

  static async deletePatient(id) {
    await patientSchema.findByIdAndDelete(id);
  }

  static async addMedicine(
    patientId,
    name,
    hour,
    qtd,
    type,
    startDate,
    endDate,
    frequency,
    userId,
    isMedic
  ) {
    const patient = await patientSchema.findById(patientId);
    if (!patient) {
      throw new PatientNotFoundError();
    }

    if (!isMedic) {
      throw new OnlyDoctorsError();
    }

    const medicine = {
      name: name,
      hour: hour,
      qtd: qtd,
      type: type,
      startDate: startDate,
      endDate: endDate,
      frequency: frequency,
      doctorId: userId,
    };

    patient.medicines.push(medicine);

    await patient.save();
  }

  static async updateMedicine(
    patientId,
    medicineId,
    name,
    hour,
    qtd,
    type,
    startDate,
    endDate,
    frequency,
    userId,
    isMedic
  ) {
    const patient = await patientSchema.findById(patientId);
    if (!patient) {
      throw new PatientNotFoundError();
    }

    const medicineIndex = patient.medicines.findIndex(
      (medicine) => medicine._id.toString() === medicineId
    );
    if (medicineIndex === -1) {
      throw new MedicineNotFoundError();
    }

    if (!isMedic || patient.medicines[medicineIndex].doctorId !== userId) {
      throw new OnlyDoctorsError();
    }

    const updatedMedicine = {
      name: name,
      hour: hour,
      qtd: qtd,
      type: type,
      startDate: startDate,
      endDate: endDate,
      frequency: frequency,
      doctorId: userId,
    };

    patient.medicines[medicineIndex] = updatedMedicine;

    await patient.save();
  }

  static async deleteMedicine(patientId, medicineId, userId, isMedic) {
    const patient = await patientSchema.findById(patientId);
    if (!patient) {
      throw new PatientNotFoundError();
    }

    const medicineIndex = patient.medicines.findIndex(
      (medicine) => medicine._id.toString() === medicineId
    );
    if (medicineIndex === -1) {
      throw new MedicineNotFoundError();
    }

    if (!isMedic || patient.medicines[medicineIndex].doctorId !== userId) {
      throw new OnlyDoctorsError();
    }

    patient.medicines.splice(medicineIndex, 1);

    await patient.save();
  }

  static async findMedicineById(patientId, medicineId, isMedic) {
    const patient = await patientSchema.findById(patientId);
    if (!patient) {
      throw new PatientNotFoundError();
    }

    const medicine = patient.medicines.find(
      (medicine) => medicine._id.toString() === medicineId
    );
    if (!medicine) {
      throw new MedicineNotFoundError();
    }

    if (!isMedic) {
      throw new OnlyDoctorsError();
    }

    return medicine;
  }

  static async findAllMedicines(patientId, isMedic) {
    const patient = await patientSchema.findById(patientId);
    if (!patient) {
      throw new PatientNotFoundError();
    }

    if (!isMedic) {
      throw new OnlyDoctorsError();
    }

    return patient.medicines;
  }
}

export default PatientService;
