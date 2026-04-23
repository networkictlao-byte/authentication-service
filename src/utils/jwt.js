const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  console.error("CRITICAL: JWT_SECRET or JWT_REFRESH_SECRET is missing from environment variables!");
  // In production, we might want to throw an error to prevent the server from starting with insecure defaults
  // throw new Error("Missing JWT secrets");
}

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
