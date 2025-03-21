import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
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
      className={`w-full block bg-white rounded-lg shadow-md ${
        active ? "unset" : "mb-12"
      } lg:flex p-4 hover:shadow-lg transition duration-300 ease-in-out`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={`${data.images[0]?.url}`}
          alt=""
          className="rounded-lg transition duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2
          className={`${styles.productTitle} text-lg font-bold transition duration-300 ease-in-out delay-100`}
        >
          {data.name}
        </h2>
        <p className="text-gray-600 transition duration-300 ease-in-out delay-200">
          {data.description}
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5
              className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through transition duration-300 ease-in-out delay-100"
            >
              ₦{data.originalPrice}
            </h5>
            <h5
              className="font-bold text-[20px] text-[#333] font-Roboto transition duration-300 ease-in-out delay-100"
            >
              ₦{data.discountPrice}
            </h5>
          </div>
          <span
            className="pr-3 font-[400] text-[17px] text-[#44a55e] transition duration-300 ease-in-out delay-200"
          >
            {data.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div
              className={`${styles.button} text-[#fff] transition duration-300 ease-in-out delay-100 hover:scale-105`}
            >
              See Details
            </div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5 transition duration-300 ease-in-out delay-100 hover:scale-105`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;