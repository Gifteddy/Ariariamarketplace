import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState(""); // New state for subcategory
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); // Store the files directly
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = new FormData();
    
    // Append the images files to FormData
    images.forEach((image) => {
      newForm.append("images", image); // The 'images' field is expected by the backend
    });
    
    // Append other form fields to FormData
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("subcategory", subcategory); // Append subcategory
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    // Perform Axios POST request to the backend API
    try {
      const response = await axios.post(
        "https://ariariamarketplacebackend.vercel.app/api/v2/product/create-product", 
        newForm,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        }
      );
      // Check for success response from backend
      if (response.data.success) {
        toast.success("Product created successfully!");
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Error creating product");
    }
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory(""); // Reset subcategory when category changes
            }}
          >
            <option value="">Choose a category</option>
            {/* Assuming categoriesData is available */}
            {categoriesData.map((i) => (
              <option value={i.title} key={i.id}>
                {i.title}
              </option>
            ))}
          </select>
        </div>
        <br />
        {category && ( // Show subcategory dropdown only if a category is selected
          <div>
            <label className="pb-2">
              Subcategory <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option value="">Choose a subcategory</option>
              {categoriesData
                .find((cat) => cat.title === category)
                .subCategories.map((sub) => (
                  <option value={sub.title} key={sub.id}>
                    {sub.title}
                  </option>
                ))}
            </select>
          </div>
        )}
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price with discount..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images.map((i, index) => (
              <img
                src={URL.createObjectURL(i)}
                key={index}
                alt="Preview"
                className="h-[120px] w-[120px] object-cover m-2"
              />
            ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
