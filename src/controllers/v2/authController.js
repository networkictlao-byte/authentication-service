const bcrypt = require("bcryptjs");
const UserStore = require("../../models/userStore");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../../utils/jwt");

// In-memory refresh token blacklist — use Redis or DB in production
const revokedTokens = new Set();

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (UserStore.findByEmail(email)) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = UserStore.create({ name, email, password: hashedPassword });

    const payload = { id: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        user: UserStore.sanitize(user),
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = UserStore.findByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const payload = { id: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: UserStore.sanitize(user),
        accessToken,
        refreshToken,
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/refresh
const refresh = (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: "Refresh token is required" });
    }

    if (revokedTokens.has(refreshToken)) {
      return res.status(401).json({ success: false, message: "Refresh token has been revoked" });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = UserStore.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }

    const payload = { id: user.id, email: user.email };
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    // Rotate: revoke old refresh token
    revokedTokens.add(refreshToken);

    return res.status(200).json({
      success: true,
      message: "Token refreshed",
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      },
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Refresh token expired, please login again" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }
    next(err);
  }
};

// POST /api/auth/logout
const logout = (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) revokedTokens.add(refreshToken);

  return res.status(200).json({ success: true, message: "Logged out successfully" });
};

// GET /api/auth/profile  (protected)
const profile = (req, res) => {
  return res.status(200).json({
    success: true,
    data: { user: req.user },
  });
};

module.exports = { register, login, refresh, logout, profile };
