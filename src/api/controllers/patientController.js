import PatientService from "../services/patientService.js";
import {
  PatientNotFoundError,
  MedicineNotFoundError,
  OnlyDoctorsError,
  InvalidCredentialsError,
  EmailCPFExistsError,
} from "../errors/patientErrors.js";

class PatientController {
  static registerPatient = async (req, res) => {
    const { name, email, cpf, password } = req.body;

    try {
      await PatientService.registerPatient(name, email, cpf, password);
      res.status(200).json({ message: "Patient successfully registered" });
    } catch (err) {
      if (err instanceof EmailCPFExistsError) {
        res.status(400).json({ error: "Email or CPF already registered" });
      } else {
        res
          .status(500)
          .json({ message: `${err.message} - Fail to create patient` });
      }
    }
  };

  static loginPatient = async (req, res) => {
    const { email, password } = req.body;

    try {
      const token = await PatientService.loginPatient(email, password);
      res.status(200).json({ token });
    } catch (err) {
      if (
        err instanceof PatientNotFoundError ||
        err instanceof InvalidCredentialsError
      ) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        res.status(500).json({ message: `${err.message} - Error to login` });
      }
    }
  };

  static logoutPatient = async (req, res) => {
    try {
      const { token } = req.body;

      await PatientService.logoutPatient(token);
      res.status(200).json({ message: "Token added to blacklist" });
    } catch (err) {
      res.status(500).json({ error: "Failed to add token to blacklist" });
    }
  };

  static findPatient = async (req, res) => {
    try {
      const patients = await PatientService.findPatient();
      res.status(200).json(patients);
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - Fail to find patient` });
    }
  };

  static findPatientById = async (req, res) => {
    try {
      const id = req.params.id;
      const patient = await PatientService.findPatientById(id);
      if (patient) {
        res.status(200).json(patient);
      } else {
        res.status(400).json({ message: "Patient not found" });
      }
    } catch (err) {
      if (err instanceof PatientNotFoundError) {
        res.status(500).json({ message: `${err.message} - Patient not found` });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  };

  static deletePatient = async (req, res) => {
    try {
      const id = req.params.id;
      await PatientService.deletePatient(id);
      res.status(200).json({ message: "Patient removed successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  static addMedicine = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const { name, hour, qtd, type, startDate, endDate, frequency } = req.body;
      const { isMedic, userId } = req;

      await PatientService.addMedicine(
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
      );

      res.status(200).json({ message: "Medicine added successfully" });
    } catch (err) {
      if (
        err instanceof PatientNotFoundError ||
        err instanceof OnlyDoctorsError
      ) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  };

  static updateMedicine = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const medicineId = req.params.medicineId;
      const { name, hour, qtd, type, startDate, endDate, frequency } = req.body;
      const { isMedic, userId } = req;

      await PatientService.updateMedicine(
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
      );

      res.status(200).json({ message: "Medicine updated successfully" });
    } catch (err) {
      if (
        err instanceof PatientNotFoundError ||
        err instanceof MedicineNotFoundError
      ) {
        res.status(404).json({ error: "Patient or Medicine not found" });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  };

  static deleteMedicine = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const medicineId = req.params.medicineId;
      const { isMedic, userId } = req;

      await PatientService.deleteMedicine(
        patientId,
        medicineId,
        userId,
        isMedic
      );
      res.status(200).json({ message: "Medicine deleted successfully" });
    } catch (err) {
      if (
        err instanceof PatientNotFoundError ||
        err instanceof MedicineNotFoundError
      ) {
        res.status(404).json({ error: "Patient or Medicine not found" });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  };

  static findMedicineById = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const medicineId = req.params.medicineId;
      const { isMedic } = req;

      const medicine = await PatientService.findMedicineById(
        patientId,
        medicineId,
        isMedic
      );

      if (medicine) {
        res.status(200).json(medicine);
      } else {
        res.status(404).json({ message: "Medicine not found" });
      }
    } catch (err) {
      if (
        err instanceof PatientNotFoundError ||
        err instanceof MedicineNotFoundError
      ) {
        res.status(404).json({ error: "Patient or Medicine not found" });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  };

  static findAllMedicines = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const { isMedic } = req;

      const medicines = await PatientService.findAllMedicines(
        patientId,
        isMedic
      );

      res.status(200).json(medicines);
    } catch (err) {
      if (err instanceof PatientNotFoundError) {
        res.status(404).json({ error: "Patient not found" });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  };
}

export default PatientController;
