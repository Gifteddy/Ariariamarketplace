import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  products: [],   // Track the products of the shop
  allProducts: [],  // Track all products (if needed for global listing)
  success: false,
  error: null,
  message: "",
};

export const productReducer = createReducer(initialState, {
  // Product creation actions
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // Get all products of a specific shop
  getAllProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  getAllProductsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Delete product of a shop
  deleteProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
    state.products = state.products.filter(
      (product) => product._id !== action.payload.productId // Assuming payload contains productId
    );
  },
  deleteProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Edit product
  editProductRequest: (state) => {
    state.isLoading = true;
  },
  editProductSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    // Find the product and replace it with the updated product
    state.products = state.products.map((product) =>
      product._id === action.payload._id ? action.payload : product
    );
    // Optionally, if you are updating all products globally:
    state.allProducts = state.allProducts.map((product) =>
      product._id === action.payload._id ? action.payload : product
    );
  },
  editProductFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Get all products (for global list)
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
