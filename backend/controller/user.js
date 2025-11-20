const express = require("express");
const User = require("../model/user");
const router = express.Router();
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// Import multer configuration
const upload = require("../utils/multer");

// create user - WITHOUT EMAIL VERIFICATION
router.post(
  "/create-user",
  upload.single("avatar"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      // Check if the email already exists
      const userEmail = await User.findOne({ email });
      if (userEmail) {
        return next(new ErrorHandler("User with this email already exists", 400));
      }

      let avatarData = {
        public_id: "",
        url: ""
      };

      // Handle avatar upload if file exists
      if (req.file) {
        try {
          // Upload the avatar file to Cloudinary
          const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "user-avatars",
            width: 150,
          });

          // Delete the file from local storage after uploading to Cloudinary
          const fs = require("fs");
          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
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

      // Create user directly without activation
      const user = await User.create({
        name,
        email,
        password,
        avatar: avatarData,
      });

      // Send token directly (auto-activate)
      sendToken(user, 201, res);

    } catch (error) {
      // Handle duplicate key error specifically
      if (error.code === 11000) {
        return next(new ErrorHandler("User with this email already exists", 400));
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

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide both email and password!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Invalid email or password!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password!", 400));
      }

      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
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

// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findById(req.user.id).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Verify current password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Current password is incorrect", 400));
      }

      // Update fields
      if (name) user.name = name;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("avatar"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await User.findById(req.user.id);

      if (!existsUser) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Delete old avatar from Cloudinary if it exists
      if (existsUser.avatar && existsUser.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(existsUser.avatar.public_id);
      }

      let avatarData = {
        public_id: "",
        url: ""
      };

      // Upload new avatar if provided
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "user-avatars",
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

      existsUser.avatar = avatarData;
      await existsUser.save();

      res.status(200).json({
        success: true,
        user: existsUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user.id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ 
        success: true, 
        user,
        message: "Address deleted successfully"
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Passwords do not match!", 400)
        );
      }

      user.password = req.body.newPassword;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find user information with the userId
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all users --- for admin
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete users --- admin
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Delete avatar from Cloudinary if exists
      if (user.avatar && user.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
