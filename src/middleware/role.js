/*
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!roles.includes(req.user.status)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.status} is not authorized to access this route`,
      });
    }

    // Optional: Also check if 'allow' is true
    if (!req.user.allow && req.user.status !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Your account has not been allowed by an administrator yet",
      });
    }

    next();
  };
};
*/

const MESSAGES = require("../utils/messages");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: MESSAGES.AUTH.UNAUTHORIZED });
    }

    if (!roles.includes(req.user.status)) {
      return res.status(403).json({
        success: false,
        message: MESSAGES.ROLE.FORBIDDEN,
      });
    }

    // Optional: Also check if 'allow' is true
    if (!req.user.allow && req.user.status !== "admin") {
      return res.status(403).json({
        success: false,
        message: MESSAGES.ROLE.NOT_ALLOWED,
      });
    }

    next();
  };
};

const isAdmin = authorize("admin");

const isSelfOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: MESSAGES.AUTH.UNAUTHORIZED });
  }

  // If admin, allow
  if (req.user.status === "admin") {
    return next();
  }

  // If self (params.id matches user.id), allow
  if (req.params.id === req.user.id) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: MESSAGES.ROLE.FORBIDDEN,
  });
};

/*
module.exports = { authorize, isAdmin };
*/

module.exports = { authorize, isAdmin, isSelfOrAdmin };

