const { verifyAccessToken } = require("../utils/jwt");
/*
const UserStore = require("../models/userStore");
*/


/*
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token missing or malformed. Use: Bearer <token>",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    // Attach user to request
    const user = UserStore.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }

    req.user = UserStore.sanitize(user);
    next();
  } catch (err) {
*/

const User = require("../models/User");

/*
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token missing or malformed. Use: Bearer <token>",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    // Attach user to request
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }

    req.user = user.toJSON();
    next();
  } catch (err) {

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Access token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid access token" });
    }
    next(err);
  }
};
*/

const MESSAGES = require("../utils/messages");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.AUTH.ACCESS_TOKEN_MISSING,
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    // Attach user to request
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: MESSAGES.AUTH.USER_NOT_FOUND });
    }

    req.user = user.toJSON();
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: MESSAGES.AUTH.ACCESS_TOKEN_EXPIRED });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: MESSAGES.AUTH.INVALID_ACCESS_TOKEN });
    }
    next(err);
  }
};


module.exports = { authenticate };
