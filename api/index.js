try {
  const app = require("../server");
  module.exports = app;
} catch (err) {
  module.exports = (req, res) => {
    res.status(500).json({
      success: false,
      message: "Failed to load server.js in Vercel function",
      error: err.message,
      stack: err.stack
    });
  };
}
