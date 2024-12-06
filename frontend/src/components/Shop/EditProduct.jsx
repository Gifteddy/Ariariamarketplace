import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editProduct } from "../../redux/actions/product"; // Import the edit product action
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the route
  const { products, success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

  // Load product details from Redux store
  useEffect(() => {
    const existingProduct = products?.find((prod) => prod._id === id);
    if (existingProduct) {
      setProduct(existingProduct);
      setName(existingProduct.name);
      setDescription(existingProduct.description);
      setCategory(existingProduct.category);
      setSubcategory(existingProduct.subcategory || "");
      setTags(existingProduct.tags || "");
      setOriginalPrice(existingProduct.originalPrice);
      setDiscountPrice(existingProduct.discountPrice);
      setStock(existingProduct.stock);
      setImages(existingProduct.images || []);
    }
  }, [products, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product updated successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [error, success, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedForm = new FormData();

    // Append images to FormData
    images.forEach((image) => {
      updatedForm.append("images", image);
    });

    // Append other form fields to FormData
    updatedForm.append("name", name);
    updatedForm.append("description", description);
    updatedForm.append("category", category);
    updatedForm.append("subcategory", subcategory);
    updatedForm.append("tags", tags);
    updatedForm.append("originalPrice", originalPrice);
    updatedForm.append("discountPrice", discountPrice);
    updatedForm.append("stock", stock);

    // Dispatch the edit product action with id
    dispatch(editProduct(id, updatedForm)); // Pass id separately
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Edit Product</h5>
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
            rows="8"
            required
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
            {categoriesData.map((i) => (
              <option value={i.title} key={i.id}>
                {i.title}
              </option>
            ))}
          </select>
        </div>
        <br />
        {category && (
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
                ?.subCategories.map((sub) => (
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
            {Array.from(images).map((image, index) => (
              <img
                src={image.url || URL.createObjectURL(image)}
                key={index}
                alt="Preview"
                className="h-[120px] w-[120px] object-cover m-2"
              />
            ))}
          </div>
        </div>
        <br />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-[5px]"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
