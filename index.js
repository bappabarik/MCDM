import express from "express";
import multer from "multer";
import cors from "cors";
import { parseExcel } from "./parseExcel.js";
import { performTOPSIS } from "./topsis.js";

import dotenv from "dotenv"

dotenv.config({
    path: './env'
})

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());
const upload = multer({ dest: "uploads/" });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const { criteria, alternatives } = parseExcel(req.file.path);

    const weights = Array(criteria.length).fill(1); // Default weights
    const criteriaType = Array(criteria.length).fill("benefit"); // Default criteria types

    res.json({ criteria, alternatives, weights, criteriaType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/calculate", (req, res) => {
  const { alternatives, weights, criteriaType } = req.body;

  try {
    const rankings = performTOPSIS(alternatives, weights, criteriaType);
    res.json({ rankings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
