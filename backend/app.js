const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({
  path: process.env.NODE_ENV !== "PRODUCTION" ? "config/.env" : undefined,
});

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: 'https://www.ariariamarketplace.com.ng',
    //origin: 'https://ariariamarketplace.vercel.app',
    //origin: 'http://localhost:3000'
  credentials: true,  // Allow cookies, headers, etc.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization']  // Specify the allowed headers
  })
);

// Preflight Request Handling
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://www.ariariamarketplace.com.ng");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Middleware for Parsing
app.use(express.json({ limit: "50mb" })); // Parse JSON bodies with a size limit
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // Parse URL-encoded data

// Test Route
app.use("/test", (req, res) => {
  res.status(200).send("Hello world!");
});

// Import Routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");

// Use Routes
app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Fallback Error Handling
app.use(ErrorHandler);

module.exports = app;
