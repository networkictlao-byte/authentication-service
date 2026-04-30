require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutesV1 = require("./src/routes/v1/auth");
const authRoutesV2 = require("./src/routes/v2/auth");

/*
const app = express();
*/

const connectDB = require("./src/config/db");

// Connect to Database
//connectDB();

const app = express();


/*
// Middleware
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
*/

const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

// Security Middleware
app.use(helmet()); // Set security HTTP headers
/*
app.use(mongoSanitize()); // Prevent NoSQL injection
*/

/*
// Prevent NoSQL injection (Body only to avoid read-only 'query' error on Vercel)
app.use(mongoSanitize({
  allowDots: true,
  replaceWith: "_",
}));
*/

// Prevent NoSQL injection (Manual sanitization to avoid Vercel's read-only 'req.query' error)
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});


app.set("trust proxy", 1); // Required for rate limiting behind Vercel/proxies

/*
// Global Rate Limiting (General protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { success: false, message: "Too many requests from this IP, please try again later." }
});
*/

const MESSAGES = require("./src/utils/messages");

// Global Rate Limiting (General protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { success: false, message: MESSAGES.RATE_LIMIT.GLOBAL }
});

app.use(limiter);

app.use(cors()); // In production, replace with: cors({ origin: process.env.FRONTEND_URL })
app.use(express.json({ limit: "10kb" })); // Body parser, with size limit
app.use(express.urlencoded({ extended: true, limit: "10kb" }));


app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});


// Routes
app.use("/api/v1/auth", authRoutesV1);
app.use("/api/v2/auth", authRoutesV2);

// Health check
app.get("/", (req, res) => res.json({
  status: "ok",
  message: "Authentication Service API"
}));

// Export for Vercel
module.exports = app;

// Local Start
if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}
