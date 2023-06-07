import medicService from "../services/medicService.js";

import {
  EmailCRMExistsError,
  MedicNotFoundError,
} from "../errors/medicErrors.js";

import { InvalidCredentialsError } from "../errors/index.js";

class MedicController {
  static register = async (req, res) => {
    const { name, email, crm, password } = req.body;

    try {
      await medicService.register(name, email, crm, password);
      res.status(200).json({ message: "Medic successfully registered" });
    } catch (err) {
      if (err instanceof EmailCRMExistsError) {
        res.status(400).json({ error: "Email or CRM already registered" });
      } else {
        res
          .status(500)
          .json({ error: `${err.message} - Failed to register medic` });
      }
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const token = await medicService.login(email, password);
      res.status(200).json({ token });
    } catch (err) {
      if (
        err instanceof MedicNotFoundError ||
        err instanceof InvalidCredentialsError
      ) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        res
          .status(500)
          .json({ error: `${err.message} - Failed to login medic` });
      }
    }
  };

  static logout = async (req, res) => {
    try {
      const { token } = req.body;

      await medicService.logout(token);
      res.status(200).json({ message: "Token added to blacklist" });
    } catch (err) {
      res.status(500).json({ error: "Failed to add token to blacklist" });
    }
  };

  static find = async (req, res) => {
    try {
      const medics = await medicService.find();
      res.status(200).json(medics);
    } catch (err) {
      res.status(500).json({ error: `${err.message} - Failed to find medics` });
    }
  };

  static findById = async (req, res) => {
    try {
      const id = req.params.id;
      const medic = await medicService.findById(id);
      res.status(200).json(medic);
    } catch (err) {
      if (err instanceof MedicNotFoundError) {
        res.status(404).json({ error: "Medic not found" });
      } else {
        res
          .status(500)
          .json({ error: `${err.message} - Failed to find medic by id` });
      }
    }
  };

  static delete = async (req, res) => {
    try {
      const id = req.params.id;
      await medicService.deleteMedic(id);
      res.status(200).json({ message: "Medic removed successfully" });
    } catch (err) {
      if (err instanceof MedicNotFoundError) {
        res.status(404).json({ error: "Medic not found" });
      } else {
        res
          .status(500)
          .json({ error: `${err.message} - Failed to delete medic` });
      }
    }
  };
}

export default MedicController;
