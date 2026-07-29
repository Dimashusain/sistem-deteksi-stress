import express from "express";
import { diagnosis } from "../controllers/diagnosisController.js";

const router = express.Router();

router.post("/", diagnosis);

export default router;