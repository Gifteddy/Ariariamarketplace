const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require ("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");

// Increase payload size limit to 50MB
router.use(bodyParser.json({ limit: "50mb" }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 2048 * 2048 }, // 10MB max file size
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new ErrorHandler("Only image files are allowed!", 400));
    }
  },
});

// Create product
router.post(
  "/create-product",
  upload.array("images", 5), // Accept up to 5 images
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      const imagesLinks = [];
      const files = req.files;

      for (const file of files) {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "products",
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: "80" },
          ],
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });

        // Remove file from local uploads after uploading to Cloudinary
        fs.unlinkSync(file.path);
      }

      const productData = {
        ...req.body,
        images: imagesLinks,
        shop,
      };

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("Received request to delete product with ID:", req.params.id);

      const product = await Product.findById(req.params.id);

      if (!product) {
        console.log("Product not found with ID:", req.params.id);
        return next(new ErrorHandler("Product is not found with this ID", 404));
      }

      console.log("Product found:", product);

      // Validate images array
      if (!Array.isArray(product.images)) {
        console.error("Invalid images data for product:", product.images);
        return next(new ErrorHandler("Product images data is invalid", 400));
      }

      // Remove images from Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        try {
          console.log("Deleting image with public_id:", product.images[i].public_id);
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        } catch (err) {
          console.error("Error deleting image from Cloudinary:", err);
        }
      }

      // Delete product from the database
      await Product.deleteOne({ _id: req.params.id });

      console.log("Product deleted successfully with ID:", req.params.id);

      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
      });
    } catch (error) {
      console.error("Internal Server Error:", error);
      return next(new ErrorHandler("Internal Server Error", 500));
    }
  })
);




// Get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Create review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            rev.rating = rating;
            rev.comment = comment;
            rev.user = user;
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviewed successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all products - Admin only
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Edit Product Route
router.put(
  "/edit-product/:id",
  isSeller, // Ensure only sellers can edit products
  upload.array("images", 5), // Handle image uploads, max 5 images
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      console.log("Editing product with ID:", productId);

      // Fetch the product from the database
      const product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found with this ID!", 404));
      }

      console.log("Existing product before update:", product);

      // Prepare data for update
      const updatedData = { ...req.body };
      console.log("Request body fields:", req.body);  // Log the fields that are being updated

      // Process new images if provided
      if (req.files && req.files.length > 0) {
        console.log("Processing new image uploads...");

        // Delete old images from Cloudinary
        if (product.images && product.images.length > 0) {
          for (const img of product.images) {
            try {
              console.log(`Deleting old image: ${img.public_id}`); // Log the image deletion attempt
              await cloudinary.v2.uploader.destroy(img.public_id);
              console.log(`Deleted image: ${img.public_id}`); // Log after successful deletion
            } catch (err) {
              console.error("Error deleting old image from Cloudinary:", err);
            }
          }
        }

        // Upload new images to Cloudinary
        const newImages = [];
        for (const file of req.files) {
          try {
            console.log(`Uploading new image: ${file.path}`); // Log the image upload attempt
            const result = await cloudinary.v2.uploader.upload(file.path, {
              folder: "products",
              transformation: [
                { width: 200, height: 200, crop: "limit" },
                { quality: "auto" },
              ],
            });

            newImages.push({
              public_id: result.public_id,
              url: result.secure_url,
            });

            console.log(`Uploaded new image: ${result.secure_url}`); // Log the uploaded image URL
          } catch (err) {
            console.error("Error uploading image to Cloudinary:", err);
          }

          // Remove the local file after upload
          fs.unlinkSync(file.path);
        }

        updatedData.images = newImages;
      } else {
        console.log("No new images provided. Retaining existing images.");
      }

      console.log("Updated data for save:", updatedData); // Log the updated data that will be saved

      // Update product in the database
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updatedData,
        {
          new: true, // Return the updated product
          runValidators: true, // Validate updated fields
        }
      );

      if (updatedProduct) {
        console.log("Updated product in database:", updatedProduct); // Log the updated product from DB
      } else {
        console.log("No product was updated. Check product ID or fields.");
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error during product update:", error);
      return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
  })
);


module.exports = router;
