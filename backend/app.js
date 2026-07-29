import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gejalaRoutes from "./routes/gejalaRoutes.js";
import diagnosisRoutes from "./routes/diagnosisRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Sistem Pakar Deteksi Stres Berjalan 🚀",
  });
});

app.use("/api/gejala", gejalaRoutes);
app.use("/api/diagnosis", diagnosisRoutes);

export default app;