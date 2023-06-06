import patientSchema from "../models/patient.js";

class PatientController {

    static createPatient = async (req, res) => {
        try {
          const patient = new patientSchema(req.body)
          await patient.save()
          res.status(201).json(patient)
        } catch (err) {
          res.status(500).json({ message: `${err.message} - Fail to create patient` })
        }
    }

    static findPatient = async (req, res) => {
        try{
            const patients = await patientSchema.find({})
            res.status(200).json(patients)
        } catch (err) {
            res.status(500).json({message: `${err.message} - Fail to find patient`})
        }
    }

    static findPatientByCpf = async (req, res) => {
        try {
            const cpf = req.params.cpf
            const patient = await patientSchema.findById(cpf)
            if(patient) {
                res.status(200).json(patient)
            } else {
                res.status(400).json({message: "Patient's CPF not found"})
            }
        } catch (err) {
            res.status(400).json({message: `${err.message} - Patient's CPF not found`})
        }
    }

    static deletePatient = async (req, res) => {
        try {
            const cpf = req.params.cpf
            await patientSchema.findByIdAndDelete(cpf)
            res.status(200).json({message: 'Patient removed successfully'})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}

export default PatientController
