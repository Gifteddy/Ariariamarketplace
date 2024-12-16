import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength = products?.reduce((acc, product) => acc + product.reviews.length, 0);
  const totalRatings = products?.reduce(
    (acc, product) => acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
    0
  );
  const avg = totalRatings / totalReviewsLength || 0;
  const averageRating = avg.toFixed(2);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="py-6">
            <div className="block w-full 800px:flex">
              {/* Product Image Section */}
              <div className="w-full p-4 800px:w-[40%]">
                <div className="relative group">
                  <img
                    src={`${data && data.images[select]?.url}`}
                    alt="Product Image"
                    className="w-full h-[auto] transition-all duration-300 ease-in-out transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {data?.images.map((i, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer transition duration-300 ease-in-out ${
                          select === index ? "border-2 border-blue-500" : "border-none"
                        }`}
                        onClick={() => setSelect(index)}
                      >
                        <img
                          src={i?.url}
                          alt={`Thumbnail ${index}`}
                          className="w-[60px] h-[60px] object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle} text-2xl font-semibold text-gray-800`}>
                  {data.name}
                </h1>
                <p className="text-gray-600 text-lg mt-2">{data.description}</p>

                <div className="flex items-center mt-4">
                  <h4 className={`${styles.productDiscountPrice} text-xl font-bold`}>
                    ₦{data.discountPrice}
                  </h4>
                  {data.originalPrice && (
                    <h3 className={`${styles.price} text-sm text-gray-500 line-through ml-2`}>
                      ₦{data.originalPrice}
                    </h3>
                  )}
                </div>

                {/* Quantity and Wishlist Section */}
                <div className="flex items-center mt-8 space-x-3">
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-teal-500 text-white rounded-full p-2 hover:bg-teal-600 transition-all duration-200"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{count}</span>
                    <button
                      className="bg-teal-500 text-white rounded-full p-2 hover:bg-teal-600 transition-all duration-200"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  <div className="ml-auto">
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer text-red-500"
                        onClick={() => removeFromWishlistHandler(data)}
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer text-gray-600"
                        onClick={() => addToWishlistHandler(data)}
                      />
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="bg-teal-500 text-white rounded-lg py-2 px-4 w-full mt-6 hover:bg-teal-600 transition-all duration-200"
                  onClick={() => addToCartHandler(data._id)}
                >
                  Add to Cart <AiOutlineShoppingCart className="inline ml-2" />
                </button>

                {/* Seller Info */}
                <div className="flex items-center pt-6">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${data?.shop?.avatar?.url}`}
                      alt="Seller Avatar"
                      className="w-[50px] h-[50px] rounded-full mr-3"
                    />
                  </Link>
                  <div>
                    <h3 className={`${styles.shop_name} text-lg font-medium`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="text-sm text-gray-500">
                      ({averageRating}/5) Ratings
                    </h5>
                  </div>
                  <button
                    className="bg-blue-500 text-white rounded-lg py-2 px-4 ml-auto hover:bg-blue-600 transition-all duration-200"
                    onClick={handleMessageSubmit}
                  >
                    Send Message <AiOutlineMessage className="inline ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f5f6fb] px-4 py-6 rounded-lg mt-8">
            <div className="flex justify-between border-b pb-3">
              <TabItem title="Product Details" isActive={activeTab === 1} onClick={() => setActiveTab(1)} />
              <TabItem title="Product Reviews" isActive={activeTab === 2} onClick={() => setActiveTab(2)} />
              <TabItem title="Seller Information" isActive={activeTab === 3} onClick={() => setActiveTab(3)} />
            </div>

            {/* Product Details */}
            {activeTab === 1 && (
              <div className="pt-4">
                <p className="text-lg">{data.description}</p>
              </div>
            )}

            {/* Product Reviews */}
            {activeTab === 2 && (
              <div className="pt-4">
                {data.reviews && data.reviews.length > 0 ? (
                  data.reviews.map((review, index) => <ReviewCard key={index} review={review} />)
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            )}

            {/* Seller Information */}
            {activeTab === 3 && <SellerInfo seller={data.shop} averageRating={averageRating} products={products} totalReviewsLength={totalReviewsLength} />}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const TabItem = ({ title, isActive, onClick }) => (
  <div className="relative">
    <h5
      className={`text-[18px] px-1 font-[600] cursor-pointer ${isActive ? "text-blue-600" : "text-gray-700"}`}
      onClick={onClick}
    >
      {title}
    </h5>
    {isActive && (
      <div className="absolute bottom-[-6px] w-full h-[3px] bg-blue-600 rounded"></div>
    )}
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="border-b py-3">
    <div className="flex items-center mb-2">
      <img
        src={review.user.avatar.url}
        alt={review.user.name}
        className="w-[40px] h-[40px] rounded-full mr-3"
      />
      <div className="flex flex-col">
        <h4 className="font-semibold text-[16px]">{review.user.name}</h4>
        <Ratings rating={review.rating} />
      </div>
    </div>
    <p>{review.comment}</p>
  </div>
);

const SellerInfo = ({ seller, averageRating, products, totalReviewsLength }) => (
  <div className="flex flex-col pt-4">
    <h3 className="font-semibold text-[20px] mb-2">{seller.name}</h3>
    <p className="text-[16px]">Total Products: {products.length}</p>
    <p className="text-[16px]">Total Reviews: {totalReviewsLength}</p>
    <p className="text-[16px]">Average Rating: {averageRating}</p>
    <Link to={`/shop/preview/${seller._id}`} className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
      Visit Shop
    </Link>
  </div>
);

export default ProductDetails;
