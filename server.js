require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutesV1 = require("./src/routes/v1/auth");
const authRoutesV2 = require("./src/routes/v2/auth");

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
/*
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
*/
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ──────────────────────────────────────────────────────────────────
// auth v1
app.use("/api/v1/auth", authRoutesV1);

// auth v2
app.use("/api/v2/auth", authRoutesV2);

// Health check
app.get("/", (req, res) => res.json({ 
  status: "ok", 
  message: "JWT Auth API running",
  url: req.url,
  originalUrl: req.originalUrl
}));

// Debug paths
app.get("/debug", (req, res) => {
  try {
    const path = require("path");
    const fs = require("fs");
    const usersPath = path.join(process.cwd(), "users.json");
    res.json({
      success: true,
      dirname: __dirname,
      cwd: process.cwd(),
      usersPath: usersPath,
      usersExists: fs.existsSync(usersPath),
      env: {
        node_env: process.env.NODE_ENV,
        has_jwt_secret: !!process.env.JWT_SECRET,
        has_refresh_secret: !!process.env.JWT_REFRESH_SECRET
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack
    });
  }
});

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// Global error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ── Start ────────────────────────────────────────────────────────────────────
/*
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   POST /api/{version}/auth/register`);
  console.log(`   POST /api/{version}/auth/login`);
  console.log(`   POST /api/{version}/auth/refresh`);
  console.log(`   POST /api/{version}/auth/logout`);
  console.log(`   GET  /api/{version}/auth/profile  (protected)`);
});
*/

if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
    console.log(`   API routes registered and ready.`);
  });
}

module.exports = app;
