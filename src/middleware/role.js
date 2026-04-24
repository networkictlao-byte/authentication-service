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

const isAdmin = authorize("admin");

module.exports = { authorize, isAdmin };
