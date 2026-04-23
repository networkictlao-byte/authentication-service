// Temporary test entry point to confirm Vercel function is running
module.exports = (req, res) => {
  res.json({
    status: "ok",
    message: "Vercel function is reachable",
    timestamp: new Date().toISOString(),
    env: {
      node_env: process.env.NODE_ENV,
      port: process.env.PORT
    }
  });
};
