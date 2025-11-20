const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");
// Import multer configuration
const upload = require("../utils/multer"); // Adjust the path to your multer setup

//create shop - WITHOUT EMAIL VERIFICATION
router.post(
  "/create-shop",
  upload.single("avatar"), // Add multer middleware
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, name, password, address, phoneNumber, zipCode } = req.body;
      
      // Check if user already exists
      const sellerEmail = await Shop.findOne({ email });
      if (sellerEmail) {
        return next(new ErrorHandler("Shop with this email already exists", 400));
      }

      let avatarData = {
        public_id: "",
        url: ""
      };

      // Handle avatar upload if file exists
      if (req.file) {
        try {
          // Upload to Cloudinary
          const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "shop-avatars",
            width: 150,
          });

          // Delete the local file after upload
          const fs = require("fs");
          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error("Error deleting local file:", err);
            }
          });

          avatarData = {
            public_id: result.public_id,
            url: result.secure_url,
          };
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          // Continue with default avatar even if upload fails
        }
      }

      // Create seller directly without activation
      const seller = await Shop.create({
        name,
        email,
        password,
        avatar: avatarData,
        address,
        phoneNumber,
        zipCode,
      });

      // Send token directly (auto-activate)
      sendShopToken(seller, 201, res);

    } catch (error) {
      // Handle duplicate key error specifically
      if (error.code === 11000) {
        return next(new ErrorHandler("Shop with this email already exists", 400));
      }
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Remove activation route since we don't need email verification
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    return next(new ErrorHandler("Email verification is disabled. Please sign up directly.", 400));
  })
);

// login shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide both email and password!", 400));
      }

      const user = await Shop.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Invalid email or password!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password!", 400));
      }

      sendShopToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      
      if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
      }
      
      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop profile picture
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("avatar"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsSeller = await Shop.findById(req.seller._id);

      if (!existsSeller) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      // Delete old avatar from Cloudinary if it exists
      if (existsSeller.avatar && existsSeller.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(existsSeller.avatar.public_id);
      }

      let avatarData = {
        public_id: "",
        url: ""
      };

      // Upload new avatar if provided
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "shop-avatars",
          width: 150,
        });

        // Delete local file
        const fs = require("fs");
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error deleting local file:", err);
          }
        });

        avatarData = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }

      existsSeller.avatar = avatarData;
      await existsSeller.save();

      res.status(200).json({
        success: true,
        seller: existsSeller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findById(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      // Update only provided fields
      if (name) shop.name = name;
      if (description) shop.description = description;
      if (address) shop.address = address;
      if (phoneNumber) shop.phoneNumber = phoneNumber;
      if (zipCode) shop.zipCode = zipCode;

      await shop.save();

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all sellers --- for admin
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller ---admin
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.params.id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      // Delete avatar from Cloudinary if exists
      if (seller.avatar && seller.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(seller.avatar.public_id);
      }

      await Shop.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller withdraw methods --- sellers
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(
        req.seller._id,
        { withdrawMethod },
        { new: true, runValidators: true }
      );

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller withdraw methods --- only seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      seller.withdrawMethod = null;
      await seller.save();

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
