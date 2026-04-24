/*
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 register/login requests per hour
  message: {
    success: false,
    message: "Too many authentication attempts, please try again after an hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
*/

const rateLimit = require("express-rate-limit");
const MESSAGES = require("../utils/messages");

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 register/login requests per hour
  message: {
    success: false,
    message: MESSAGES.RATE_LIMIT.AUTH,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { authLimiter };
