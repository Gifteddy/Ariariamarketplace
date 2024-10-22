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
    <>
      <div
        className="w-full h-[420px] bg-white rounded-lg shadow-lg hover:shadow-xl p-4 relative cursor-pointer transition-transform duration-300 transform hover:scale-105"
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <Link
          to={`${
            isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
          }`}
        >
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[220px] object-cover rounded-t-lg mb-4 transition-all duration-300"
          />
        </Link>

        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name} font-bold`}>{data.shop.name}</h5>
        </Link>

        <Link
          to={`${
            isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
          }`}
        >
          <h4 className="pb-2 text-[18px] font-semibold text-gray-800">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex items-center pb-2">
            <Ratings rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex items-center">
              <h5 className={`${styles.productDiscountPrice} text-lg font-bold text-black`}>
                ₦{data.discountPrice || data.originalPrice}
              </h5>
              {data.originalPrice && (
                <h4 className={`${styles.price} text-sm text-gray-400 line-through pl-2`}>
                  ₦{data.originalPrice}
                </h4>
              )}
            </div>
            <span className="font-medium text-[16px] text-green-600">
              {data.sold_out} sold
            </span>
          </div>
        </Link>

        {/* Action Icons */}
        <div className="absolute right-3 top-4 flex flex-col items-center space-y-3">
          {click ? (
            <AiFillHeart
              size={24}
              className="cursor-pointer"
              onClick={() => removeFromWishlistHandler(data)}
              color="red"
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={24}
              className="cursor-pointer"
              onClick={() => addToWishlistHandler(data)}
              color="#333"
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={24}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={24}
            className="cursor-pointer"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
        </div>

        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </>
  );
};

export default ProductCard;
