import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import Ratings from "../../Products/Ratings";
import styles from "../../../styles/styles";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

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
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className="relative w-full h-[480px] bg-gray-50 rounded-lg shadow-md hover:shadow-xl p-4 overflow-hidden group transition-transform duration-300 transform hover:scale-105"
    >
      {/* Product Image */}
      <div className="relative w-full h-[240px] overflow-hidden">
        <Link
          to={`${
            isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
          }`}
        >
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt="Product"
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="px-3 pt-4">
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
            {data.shop.name}
          </h5>
        </Link>
        <Link
          to={`${
            isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
          }`}
        >
          <h4 className="text-lg font-bold text-gray-800 truncate hover:text-gray-900 transition-colors">
            {data.name}
          </h4>
        </Link>
        <div className="flex items-center py-2">
          <Ratings rating={data?.ratings} />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h5 className="text-lg font-semibold text-black">
              ₦{data.discountPrice || data.originalPrice}
            </h5>
            {data.originalPrice && (
              <h4 className="text-sm text-gray-400 line-through">
                ₦{data.originalPrice}
              </h4>
            )}
          </div>
          {/*<span className="text-sm font-medium text-green-600">
            {data.sold_out} sold
          </span>*/}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-around">
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-500 p-2 rounded-full shadow-md hover:bg-green-600 text-white transition-transform transform hover:scale-110"
          title="Quick view"
        >
          <AiOutlineEye size={24} />
        </button>
        <button
          onClick={() => addToCartHandler(data._id)}
          className="bg-blue-500 p-2 rounded-full shadow-md hover:bg-green-600 text-white transition-transform transform hover:scale-110"
          title="Add to cart"
        >
          <AiOutlineShoppingCart size={24} />
        </button>
        <button
          onClick={() =>
            click ? removeFromWishlistHandler(data) : addToWishlistHandler(data)
          }
          className={`${
            click ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          } p-2 rounded-full shadow-md text-white transition-transform transform hover:scale-110`}
          title={click ? "Remove from wishlist" : "Add to wishlist"}
        >
          {click ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
        </button>
      </div>

      {/* Quick View Modal */}
      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </div>
  );
};

export default ProductCard;
