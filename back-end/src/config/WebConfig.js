require("dotenv").config();

const corsOptions = {
  origin: process.env.CROSS,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: "*",
  credentials: true,
};

module.exports = corsOptions;
