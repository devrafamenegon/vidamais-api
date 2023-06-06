import medicSchema from "../models/medic.js";

class MedicController {

    static createMedic = async (req, res) => {
        try {
            const medic = new medicSchema(req.body)
            await medic.save()
            res.status(201).json(medic)
        } catch (err) {
            res.status(500).json({message: `${err.message} - Fail to create medic`})
        }
    }

    static findMedics = async (req, res) => {
        try {
            const medics = await medicSchema.find({})
            res.status(200).json(medics)
        } catch (err) {
            res.status(500).json({message: `${err.message} - Fail to find medic`})
        }
    }

    static findMedicByCrm = async (req, res) => {
        try {
            const crm = req.params.crm
            const medic = await medicSchema.findById(crm)
            if(medic) {
                res.status(200).json(medic)
            } else {
                res.status(400).json({message: "Medic's CRM not found"})
            }
        } catch (err) {
            res.status(400).json({message: `${err.message} - Medic's CRM not found`})
        }
    }

    static deleteMedic = async (req, res) => {
        try {
            const crm = req.params.crm
            await medicSchema.findByIdAndDelete(crm)
            res.status(200).json({message: 'Medic removed successfully'})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
}

export default MedicController