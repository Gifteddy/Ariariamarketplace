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

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
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
    toast.success("Removed from wishlist");
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
    toast.success("Added to wishlist");
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product out of stock!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const discountPercentage = data.originalPrice 
    ? Math.round(((data.originalPrice - (data.discountPrice || data.originalPrice)) / data.originalPrice) * 100)
    : 0;

  return (
    <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-blue-200">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        {/* Discount Badge - FIXED z-index */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 z-6">
            <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Stock Status - FIXED z-index */}
        {data.stock < 1 && (
          <div className="absolute top-3 right-3 z-6">
            <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist Button - FIXED z-index */}
        <button
          onClick={() => click ? removeFromWishlistHandler(data) : addToWishlistHandler(data)}
          className={`absolute top-3 right-3 z-6 p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
            click 
              ? "bg-red-500/90 text-white shadow-lg" 
              : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
          }`}
        >
          {click ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
        </button>

        {/* Product Image */}
        <Link
          to={`${
            isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
          }`}
          className="block w-full h-full"
        >
          <div className="relative w-full h-full">
            {/* Loading Skeleton */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
            )}
            
            {/* Error Fallback */}
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                <div className="text-center text-gray-400">
                  <AiOutlineShoppingCart size={48} className="mx-auto mb-2" />
                  <p className="text-sm">Image not available</p>
                </div>
              </div>
            ) : (
              <img
                src={`${data.images && data.images[0]?.url}`}
                alt={data.name}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </Link>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 z-0">
          <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={() => setOpen(true)}
              className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 text-gray-800"
              title="Quick View"
            >
              <AiOutlineEye size={20} />
            </button>
            {data.stock > 0 && (
              <button
                onClick={() => addToCartHandler(data._id)}
                className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-full shadow-lg hover:from-blue-600 hover:to-green-600 hover:scale-110 transition-all duration-300 text-white"
                title="Add to Cart"
              >
                <AiOutlineShoppingCart size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Shop Name */}
        <Link 
          to={`/shop/preview/${data?.shop._id}`}
          className="inline-block mb-2"
        >
          <span className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-2 py-1 rounded-full">
            {data.shop.name}
          </span>
        </Link>

        {/* Product Name */}
        <Link
          to={`${
            isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
          }`}
          className="block mb-3"
        >
          <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 hover:text-blue-600 transition-colors duration-300">
            {data.name}
          </h3>
        </Link>

        {/* Ratings */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <AiFillStar className="text-yellow-400" size={16} />
              <span className="text-sm font-medium text-gray-900 ml-1">
                {data?.ratings || 0}
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              {data?.sold_out || 0} sold
            </span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ₦{data.discountPrice || data.originalPrice}
            </span>
            {data.originalPrice && data.discountPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₦{data.originalPrice}
              </span>
            )}
          </div>
          
          {/* Stock Indicator */}
          {data.stock > 0 && data.stock <= 10 && (
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
              Only {data.stock} left
            </span>
          )}
        </div>

        {/* Add to Cart Button - Mobile */}
        {data.stock > 0 && (
          <button
            onClick={() => addToCartHandler(data._id)}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 lg:hidden"
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* Quick View Modal - Smaller version */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <ProductDetailsCard 
              setOpen={setOpen} 
              data={data} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
