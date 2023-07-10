import express from "express";
import db from "./api/configs/dbConnect.js";
import routes from "./api/routes/index.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Connected successfully with database");
});

const app = express();
app.use(express.json());
app.use(cors());
routes(app);

export default app;
