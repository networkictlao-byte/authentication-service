const app = require("../server");
const serverless = require("serverless-http");

// Export for Vercel
module.exports = serverless(app);
