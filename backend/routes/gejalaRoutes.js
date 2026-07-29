import express from "express";
import { getGejala } from "../controllers/gejalaController.js";

const router = express.Router();

router.get("/", getGejala);

export default router;