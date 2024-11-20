const express = require("express");
const cors = require("cors");
const app = require("./app"); // Assuming app.js contains your express app
const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/.env" });
}

// Database connection
connectDatabase();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Add CORS middleware
app.use(
  cors({
    origin: "https://www.ariariamarketplace.com.ng", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://www.ariariamarketplace.com.ng");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down server due to ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
