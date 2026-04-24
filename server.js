require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutesV1 = require("./src/routes/v1/auth");
const authRoutesV2 = require("./src/routes/v2/auth");

/*
const app = express();
*/

const connectDB = require("./src/config/db");

// Connect to Database
connectDB();

const app = express();


// Middleware
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutesV1);
app.use("/api/v2/auth", authRoutesV2);

// Health check
app.get("/", (req, res) => res.json({ 
  status: "ok", 
  message: "Authentication Service API",
  env: process.env.NODE_ENV
}));

// Export for Vercel
module.exports = app;

// Local Start
if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}
