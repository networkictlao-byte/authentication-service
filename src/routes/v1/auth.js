const { Router } = require("express");
const { body, validationResult } = require("express-validator");
/*
const { register, login, refresh, logout, profile } = require("../../controllers/v1/authController");
*/

/*
const { register, login, refresh, logout, profile, deleteUser } = require("../../controllers/v1/authController");
*/

const { register, login, refresh, logout, profile, deleteUser, getUsers } = require("../../controllers/v1/authController");


const { authenticate } = require("../../middleware/auth");
const MESSAGES = require("../../utils/messages");


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
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];
*/

const registerRules = [
  body("name").trim().notEmpty().withMessage(MESSAGES.VALIDATION.NAME_REQUIRED).isLength({ min: 2 }).withMessage(MESSAGES.VALIDATION.NAME_LENGTH),
  body("email").isEmail().normalizeEmail().withMessage(MESSAGES.VALIDATION.EMAIL_REQUIRED),
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


// Routes
router.post("/register", registerRules, validate, register);
router.post("/login", loginRules, validate, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
/*
router.get("/profile", authenticate, profile);
*/

router.get("/profile", authenticate, profile);
/*
router.delete("/user/:id", authenticate, deleteUser);
*/

router.delete("/user/:id", authenticate, deleteUser);
router.get("/users", authenticate, getUsers);



module.exports = router;
