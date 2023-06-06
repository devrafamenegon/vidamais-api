import express from "express";
import medic from "./medicRoutes.js";
import patient from "./patientRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Vida+"})
    })

    app.use(
        express.json(),
        medic,
        patient
    )
}


export default routes
