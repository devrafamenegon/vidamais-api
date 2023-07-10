import patientService from "../services/patientService.js";
import {
  PatientNotFoundError,
  MedicineNotFoundError,
  OnlyMedicsError,
  EmailCPFExistsError,
} from "../errors/patientErrors.js";

import {
  InvalidCredentialsError,
  UnauthorizedAccessError,
} from "../errors/index.js";

class PatientController {
  static register = async (req, res) => {
    const { name, cpf, birthdate, email, password } = req.body;

    try {
      await patientService.register(name, cpf, birthdate, email, password);
      res.status(200).json({ message: "Patient successfully registered" });
    } catch (err) {
      if (err instanceof EmailCPFExistsError) {
        res.status(400).json({ error: "Email or CPF already registered" });
      } else {
        res
          .status(500)
          .json({ error: `${err.message} - Failed to register patient` });
      }
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const token = await patientService.login(email, password);
      res.status(200).json({ token });
    } catch (err) {
      if (
        err instanceof PatientNotFoundError ||
        err instanceof InvalidCredentialsError
      ) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        res
          .status(500)
          .json({ error: `${err.message} - Failed to login patient` });
      }
    }
  };

  static logout = async (req, res) => {
    try {
      const { token } = req.body;

      await patientService.logout(token);
      res.status(200).json({ message: "Token added to blacklist" });
    } catch (err) {
      res
        .status(500)
        .json({ error: `${err.message} - Failed to add token to blacklist` });
    }
  };

  static find = async (req, res) => {
    try {
      const patients = await patientService.find();
      res.status(200).json(patients);
    } catch (err) {
      res
        .status(500)
        .json({ error: `${err.message} - Failed to find patients` });
    }
  };

  static findById = async (req, res) => {
    try {
      const id = req.params.id;
      const patient = await patientService.findById(id);
      res.status(200).json(patient);
    } catch (err) {
      if (err instanceof PatientNotFoundError) {
        res.status(404).json({ error: "Patient not found" });
      } else {
        res
          .status(500)
          .json({ error: `${err.message} - Failed to find patient by id` });
      }
    }
  };

  static update = async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, oldPassword, newPassword } = req.body;
      const { isPatient, userId } = req;

      await patientService.update(
        id,
        name,
        email,
        oldPassword,
        newPassword,
        isPatient,
        userId
      );
      res.status(200).json({ message: "Patient updated successfully" });
    } catch (err) {
      if (err instanceof PatientNotFoundError) {
        res.status(404).json({ error: "Patient not found" });
      } else if (err instanceof EmailCPFExistsError) {
        res.status(400).json({ error: "Email already registered" });
      } else if (err instanceof UnauthorizedAccessError) {
        res.status(400).json({ error: "Unauthorized" });
      } else {
        res
          .status(500)
          .json({ error: `${err.message} - Failed to update patient` });
      }
    }
  };

  static delete = async (req, res) => {
    try {
      const id = req.params.id;
      await patientService.delete(id);
      res.status(201).json({ message: "Patient removed successfully" });
    } catch (err) {
      if (err instanceof PatientNotFoundError) {
        res.status(404).json({ error: "Patient not found" });
      } else {
        res
          .status(500)
          .json({ error: `${err.message} - Failed to delete patient` });
      }
    }
  };

  static addMedicine = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const { name, hour, qtd, type, startDate, endDate, frequency } = req.body;
      const { isMedic, userId } = req;

      await patientService.addMedicine(
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
        err instanceof OnlyMedicsError
      ) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        res
          .status(500)
          .json({ error: `${err.message} - Failed to add medicine` });
      }
    }
  };

  static updateMedicine = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const medicineId = req.params.medicineId;
      const { name, hour, qtd, type, startDate, endDate, frequency } = req.body;
      const { isMedic, userId } = req;

      await patientService.updateMedicine(
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
        res
          .status(500)
          .json({ error: `${err.message} - Failed to update medicine` });
      }
    }
  };

  static deleteMedicine = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const medicineId = req.params.medicineId;
      const { isMedic, userId } = req;

      await patientService.deleteMedicine(
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
        res
          .status(500)
          .json({ error: `${err.message} - Failed to delete medicine` });
      }
    }
  };

  static findMedicineById = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const medicineId = req.params.medicineId;
      const { isMedic } = req;

      const medicine = await patientService.findMedicineById(
        patientId,
        medicineId,
        isMedic
      );

      res.status(200).json(medicine);
    } catch (err) {
      if (
        err instanceof PatientNotFoundError ||
        err instanceof MedicineNotFoundError
      ) {
        res.status(404).json({ error: "Patient or Medicine not found" });
      } else {
        res
          .status(500)
          .json({ error: `${err.message} - Failed to find medicine by id` });
      }
    }
  };

  static findAllMedicines = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const { isMedic, isOwnPatient } = req;

      const medicines = await patientService.findAllMedicines(
        patientId,
        isMedic,
        isOwnPatient
      );

      res.status(200).json(medicines);
    } catch (err) {
      if (err instanceof PatientNotFoundError) {
        res.status(404).json({ error: "Patient not found" });
      } else {
        res
          .status(500)
          .json({ error: `${err.message} - Failed to find medicines` });
      }
    }
  };
}

export default PatientController;
