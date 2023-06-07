import medicService from "../services/medicService.js";

class MedicController {
  static register = async (req, res) => {
    const { name, email, crm, password } = req.body;

    try {
      await patientService.register(name, email, crm, password);
      res.status(200).json({ message: "Patient successfully registered" });
    } catch (err) {
      if (err instanceof EmailCRMExistsError) {
        res.status(400).json({ error: "Email or CRM already registered" });
      } else {
        res
          .status(500)
          .json({ message: `${err.message} - Fail to create patient` });
      }
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const medic = await medicService.findMedicByEmail(email);
      if (!medic) {
        return res.status(401).json({ error: "User not found" });
      }

      const passwordMatch = await medicService.comparePassword(
        password,
        medic.password
      );
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = medicService.generateToken(medic._id);

      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `${err.message} - Error during login` });
    }
  };

  static find = async (req, res) => {
    try {
      const medics = await medicService.findAllMedics();
      res.status(200).json(medics);
    } catch (err) {
      res
        .status(500)
        .json({ message: `${err.message} - Failed to find medics` });
    }
  };

  static findById = async (req, res) => {
    try {
      const id = req.params.id;
      const medic = await medicService.findMedicById(id);
      if (medic) {
        res.status(200).json(medic);
      } else {
        res.status(400).json({ message: "Medic not found" });
      }
    } catch (err) {
      res.status(400).json({ message: `${err.message} - Medic not found` });
    }
  };

  static delete = async (req, res) => {
    try {
      const id = req.params.id;
      await medicService.deleteMedic(id);
      res.status(200).json({ message: "Medic removed successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default MedicController;
