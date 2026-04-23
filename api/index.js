require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutesV1 = require("../src/routes/v1/auth");
const authRoutesV2 = require("../src/routes/v2/auth");

const app = express();

// Basic Middleware
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutesV1);
app.use("/api/v2/auth", authRoutesV2);

// Health check
app.get("/api", (req, res) => res.json({
    status: "ok",
    message: "Authentication Service is running on Vercel",
    time: new Date().toISOString()
}));

// Fallback for root if accessed via /api/index
app.get("/", (req, res) => res.json({ message: "API Entry Point" }));

module.exports = app;
