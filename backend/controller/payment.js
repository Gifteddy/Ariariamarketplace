const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const axios = require("axios");

// Paystack API URL
const PAYSTACK_URL = "https://api.paystack.co/transaction/initialize";

// Route to process payment
router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const { amount, email } = req.body; // Ensure to receive amount and email

    try {
      const response = await axios.post(
        PAYSTACK_URL,
        {
          email: email, // Customer's email address
          amount: amount * 100, // Paystack expects the amount in kobo (1/100 of the currency unit)
          currency: "NGN", // Change to your preferred currency
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Paystack Secret Key
            "Content-Type": "application/json",
          },
        }
      );

      // Return success response with payment URL
      res.status(200).json({
        success: true,
        paymentUrl: response.data.data.authorization_url, // Redirect URL to Paystack for payment
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Payment processing failed. Please try again.",
      });
    }
  })
);

// Route to get Paystack API key
router.get(
  "/paystack-public-key",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ publicKey: process.env.PAYSTACK_API_KEY });
  })
);

module.exports = router;
