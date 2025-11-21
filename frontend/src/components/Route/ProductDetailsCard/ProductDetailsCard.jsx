import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineStar,
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

const ProductDetailsCard = ({ setOpen, data, isCompact = false }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

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
      toast.error(`Only ${data.stock} items left in stock!`);
    } else {
      const cartData = { ...data, qty: count };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart successfully!");
      setOpen(false);
    }
  };

  const toggleWishlist = () => {
    if (isWishlist) {
      dispatch(removeFromWishlist(data));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist(data));
      toast.success("Added to wishlist");
    }
    setIsWishlist(!isWishlist);
  };

  const discountPercentage = data.originalPrice 
    ? Math.round(((data.originalPrice - (data.discountPrice || data.originalPrice)) / data.originalPrice) * 100)
    : 0;

  return (
    data && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] p-4">
        <div className={`bg-white rounded-xl shadow-2xl relative max-h-[90vh] overflow-y-auto ${
          isCompact ? 'max-w-md w-full' : 'max-w-4xl w-full'
        }`}>
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
          >
            <RxCross1 size={20} className="text-gray-600" />
          </button>

          <div className={`${isCompact ? 'p-4' : 'p-6'} space-y-6`}>
            {/* Product Images Section */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Image */}
              <div className={`${isCompact ? 'lg:w-1/2' : 'lg:w-2/5'} space-y-4`}>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={data?.images?.[selectedImage]?.url}
                    alt={data.name}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                </div>
                
                {/* Thumbnail Images */}
                {data.images && data.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {data.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${
                          selectedImage === index 
                            ? 'border-blue-500' 
                            : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={`${data.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className={`${isCompact ? 'lg:w-1/2' : 'lg:w-3/5'} space-y-4`}>
                {/* Product Header */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                    {data.name}
                  </h1>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <AiOutlineStar className="text-yellow-400" size={18} />
                      <span className="text-sm font-medium text-gray-700">
                        {data.ratings || 0}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({data.sold_out || 0} sold)
                      </span>
                    </div>
                    {data.stock > 0 ? (
                      <span className="text-sm text-green-600 font-medium">
                        In Stock ({data.stock} available)
                      </span>
                    ) : (
                      <span className="text-sm text-red-600 font-medium">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Section */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₦{data.discountPrice || data.originalPrice}
                  </span>
                  {data.originalPrice && data.discountPrice && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ₦{data.originalPrice}
                      </span>
                      {discountPercentage > 0 && (
                        <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                          -{discountPercentage}%
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {data.description}
                </p>

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decrementCount}
                      disabled={count <= 1}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg font-medium">-</span>
                    </button>
                    <span className="w-12 text-center text-lg font-semibold text-gray-900">
                      {count}
                    </span>
                    <button
                      onClick={incrementCount}
                      disabled={data.stock <= count}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg font-medium">+</span>
                    </button>
                    <span className="text-sm text-gray-500 ml-2">
                      Max: {data.stock}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => addToCartHandler(data._id)}
                    disabled={data.stock === 0}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <AiOutlineShoppingCart size={20} />
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={toggleWishlist}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {isWishlist ? (
                      <AiFillHeart size={20} className="text-red-500" />
                    ) : (
                      <AiOutlineHeart size={20} className="text-gray-600" />
                    )}
                    <span className="font-medium">
                      {isWishlist ? 'In Wishlist' : 'Wishlist'}
                    </span>
                  </button>
                </div>

                {/* Shop Info */}
                <div className="border-t border-gray-200 pt-4">
                  <Link 
                    to={`/shop/preview/${data.shop._id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={data.shop.avatar?.url || data?.images?.[0]?.url}
                      alt={data.shop.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {data.shop.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Visit Shop
                      </p>
                    </div>
                  </Link>
                  
                  <button className="w-full mt-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                    <AiOutlineMessage size={18} />
                    Message Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetailsCard;
