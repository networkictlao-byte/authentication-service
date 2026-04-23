const express = require("express");
const app = express();

app.get("/api/test", (req, res) => {
  res.json({
    status: "ok",
    message: "Standalone Express on Vercel is working!",
    env: process.env.NODE_ENV
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Root of /api is working" });
});

module.exports = app;
