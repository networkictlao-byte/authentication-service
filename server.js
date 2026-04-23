require("dotenv").config();
const express = require("express");
const authRoutesV1 = require("./src/routes/v1/auth");
const authRoutesV2 = require("./src/routes/v2/auth");

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ──────────────────────────────────────────────────────────────────
// auth v1
app.use("/api/v1/auth", authRoutesV1);

// auth v2
app.use("/api/v2/auth", authRoutesV2);

// Health check
app.get("/", (req, res) => res.json({ status: "ok", message: "JWT Auth API running" }));

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// Global error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   POST /api/{version}/auth/register`);
  console.log(`   POST /api/{version}/auth/login`);
  console.log(`   POST /api/{version}/auth/refresh`);
  console.log(`   POST /api/{version}/auth/logout`);
  console.log(`   GET  /api/{version}/auth/profile  (protected)`);
});

module.exports = app;
