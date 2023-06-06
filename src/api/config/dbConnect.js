import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

let db_url = process.env.DB_URL

mongoose.connect(db_url)

let db = mongoose.connection

export default db