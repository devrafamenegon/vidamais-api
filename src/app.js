import express from "express";
import db from "./api/config/dbConnect.js";
import routes from "./api/routes/index.js";
import dotenv from 'dotenv'

dotenv.config()

db.on("error", console.log.bind(console, 'Connection error'))
db.once("open", () => {
  console.log('Connected successfully with database')
})

const app = express()
app.use(express.json())
routes(app);

export default app
