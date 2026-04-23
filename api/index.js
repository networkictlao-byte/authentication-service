const serverless = require("serverless-http");
const app = require("../server");

// Wrap the Express app with serverless-http as recommended for Vercel
module.exports = serverless(app);
