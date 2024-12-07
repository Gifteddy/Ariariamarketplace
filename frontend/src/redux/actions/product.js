import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/product/create-product`,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };


// Edit product action
export const editProduct = (id, updatedData, images) => async (dispatch) => {
  try {
    dispatch({
      type: "editProductRequest",
    });

    // Create FormData to handle product data and images
    const formData = new FormData();
    Object.keys(updatedData).forEach((key) => {
      formData.append(key, updatedData[key]);
    });

    // Log updated data for debugging
    console.log("Updated Data:", updatedData);

    // Append images if any are provided
    if (images && images.length > 0) {
      images.forEach((image, index) => {
        formData.append("images", image);
        console.log(`Appending image ${index}:`, image);  // Log each image added
      });
    }

    // Debug FormData entries
    console.log("Form Data Entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);  // Log each formData entry for debugging
    }

    // Send PUT request to update product
    const { data } = await axios.put(
      `${server}/product/edit-product/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token from localStorage
          "Content-Type": "multipart/form-data",  // Required for sending form data
        },
        withCredentials: true,  // Ensure cookies (if needed) are sent with the request
      }
    );

    // Log successful response
    console.log("Edit Product Success Response:", data);

    // Dispatch success action with updated product data
    dispatch({
      type: "editProductSuccess",
      payload: data.product,  // Updated product data from the backend
    });
  } catch (error) {
    // Log error response for debugging
    console.error("Edit Product Error Response:", error.response?.data);

    // Dispatch fail action with error message if the request fails
    dispatch({
      type: "editProductFail",
      payload: error.response?.data?.message || error.message || "Something went wrong",
    });
  }
};





// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
