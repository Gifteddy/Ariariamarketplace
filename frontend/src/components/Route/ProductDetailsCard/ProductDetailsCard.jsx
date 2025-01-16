import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setIsWishlist(true);
    } else {
      setIsWishlist(false);
    }
  }, [wishlist, data._id]);

  const decrementCount = () => count > 1 && setCount(count - 1);
  const incrementCount = () => setCount(count + 1);

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else if (data.stock < count) {
      toast.error("Product stock limited!");
    } else {
      const cartData = { ...data, qty: count };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart successfully!");
    }
  };

  const toggleWishlist = () => {
    if (isWishlist) {
      dispatch(removeFromWishlist(data));
    } else {
      dispatch(addToWishlist(data));
    }
    setIsWishlist(!isWishlist);
  };

  return (
    data && (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-40">
        <div className="w-full max-w-4xl h-[90vh] overflow-y-auto bg-white rounded-md shadow-lg p-6 relative">
          <RxCross1
            size={30}
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setOpen(false)}
          />

          <div className="flex flex-col ">
            {/* Left Section */}
            <div className="w-full  mb-6 ">
              <img
                src={data?.images?.[0]?.url}
                alt={data.name}
                className="w-full h-auto object-cover rounded-md"
              />
              <div className="mt-4">
                <Link
                  to={`/shop/preview/${data.shop._id}`}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={data?.images?.[0]?.url}
                    alt="Shop"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{data.shop.name}</h3>
                    <p className="text-sm text-gray-500">{data?.ratings} Ratings</p>
                  </div>
                </Link>
              </div>
              <div
                className="mt-4 bg-gradient-to-r from-teal-400 to-teal-500 text-white text-center py-2 rounded-md cursor-pointer"
                onClick={() => {}}
              >
                <span className="flex items-center justify-center">
                  Send Message <AiOutlineMessage className="ml-2" />
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full pt-4  pl-0 ">
              <h1 className="text-2xl  font-bold text-gray-800">
                {data.name}
              </h1>
              <p className="text-gray-600 mt-2">{data.description}</p>

              <div className="flex items-center mt-3">
                <h4 className="text-xl font-semibold text-teal-600">
                  ₦{data.discountPrice}
                </h4>
                {data.originalPrice && (
                  <h3 className="ml-2 text-gray-500 line-through">
                    ₦{data.originalPrice}
                  </h3>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mt-6 space-x-3">
                <button
                  className="bg-teal-500 text-white font-bold rounded-md px-4 py-2 shadow-md hover:opacity-75 transition"
                  onClick={decrementCount}
                >
                  -
                </button>
                <span className="text-lg text-gray-700">{count}</span>
                <button
                  className="bg-teal-500 text-white font-bold rounded-md px-4 py-2 shadow-md hover:opacity-75 transition"
                  onClick={incrementCount}
                >
                  +
                </button>
              </div>

              {/* Wishlist Button */}
              <div className="mt-6">
                <button
                  onClick={toggleWishlist}
                  className="text-xl text-red-500 cursor-pointer"
                  title={isWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>
              </div>

              {/* Add to Cart Button */}
              <div
                className="mt-6 bg-teal-500 text-white text-center py-3 rounded-md cursor-pointer shadow-md hover:opacity-75 transition"
                onClick={() => addToCartHandler(data._id)}
              >
                <span className="flex items-center justify-center">
                  Add to cart <AiOutlineShoppingCart className="ml-2" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetailsCard;
