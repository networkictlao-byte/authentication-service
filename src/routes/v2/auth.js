const { Router } = require("express");
const { body, validationResult } = require("express-validator");
/*
const { register, login, refresh, logout, profile } = require("../../controllers/v1/authController");
*/

/*
const { register, login, refresh, logout, profile, deleteUser } = require("../../controllers/v2/authController");
*/

/*
const { register, login, refresh, logout, profile, deleteUser, getUsers } = require("../../controllers/v2/authController");
*/

/*
const { register, login, refresh, logout, profile, deleteUser, getUsers, updateUser } = require("../../controllers/v2/authController");
*/

const { register, login, refresh, logout, profile, deleteUser, getUsers, updateUser, changePassword } = require("../../controllers/v2/authController");




const { authenticate } = require("../../middleware/auth");
const MESSAGES = require("../../utils/messages");
const { authLimiter } = require("../../middleware/rateLimiter");
const { isAdmin, isSelfOrAdmin } = require("../../middleware/role");





const router = Router();

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  next();
};

/*
const registerRules = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("phoneNumber").optional().trim(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];
*/

const registerRules = [
  body("name").trim().notEmpty().withMessage(MESSAGES.VALIDATION.NAME_REQUIRED).isLength({ min: 2 }).withMessage(MESSAGES.VALIDATION.NAME_LENGTH),
  body("email").isEmail().normalizeEmail().withMessage(MESSAGES.VALIDATION.EMAIL_REQUIRED),
  body("phoneNumber").optional().trim(),
  body("password").isLength({ min: 6 }).withMessage(MESSAGES.VALIDATION.PASSWORD_LENGTH),
];


/*
const loginRules = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
*/

const loginRules = [
  body("email").isEmail().normalizeEmail().withMessage(MESSAGES.VALIDATION.EMAIL_REQUIRED),
  body("password").notEmpty().withMessage(MESSAGES.VALIDATION.PASSWORD_REQUIRED),
];

const updateRules = [
  body("name").optional().trim().isLength({ min: 2 }).withMessage(MESSAGES.VALIDATION.NAME_LENGTH),
  body("email").optional().isEmail().normalizeEmail().withMessage(MESSAGES.VALIDATION.EMAIL_REQUIRED),
  body("phoneNumber").optional().trim(),
  body("status").optional().isIn(["admin", "general"]),
  body("allow").optional().isBoolean(),
];

const passwordRules = [
  body("newPassword").isLength({ min: 6 }).withMessage(MESSAGES.VALIDATION.PASSWORD_LENGTH),
];




/*
// Routes
router.post("/register", registerRules, validate, register);
router.post("/login", loginRules, validate, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
*/

/*
// Routes
router.post("/register", authLimiter, registerRules, validate, register);
router.post("/login", authLimiter, loginRules, validate, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
*/

// Routes
router.post("/register", authLimiter, registerRules, validate, register);
router.post("/login", authLimiter, loginRules, validate, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.put("/user/:id", authenticate, isSelfOrAdmin, updateRules, validate, updateUser);
router.put("/change-password/:id", authenticate, isSelfOrAdmin, passwordRules, validate, changePassword);



/*
router.get("/profile", authenticate, profile);
*/

router.get("/profile", authenticate, profile);
/*
router.delete("/user/:id", authenticate, deleteUser);
*/

/*
router.delete("/user/:id", authenticate, deleteUser);
router.get("/users", authenticate, getUsers);
*/

router.delete("/user/:id", authenticate, isAdmin, deleteUser);
router.get("/users", authenticate, isAdmin, getUsers);




module.exports = router;
