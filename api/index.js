const app = require("../server");

// Vercel natively supports Express apps by exporting the app instance.
// No need for serverless-http as it may cause timeouts or connection resets.
module.exports = app;
