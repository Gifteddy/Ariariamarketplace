import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch, id]);

  const [active, setActive] = useState(1);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full">
      {/* Tab Header */}
      <div className="flex w-full items-center justify-between flex-wrap">
        <div className="w-full md:w-auto flex flex-wrap">
          <div
            className="flex items-center cursor-pointer pr-5 md:pr-10"
            onClick={() => setActive(1)}
          >
            <h5
              className={`font-[600] text-[16px] md:text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              }`}
            >
              Shop Products
            </h5>
          </div>
          <div
            className="flex items-center cursor-pointer pr-5 md:pr-10"
            onClick={() => setActive(2)}
          >
            <h5
              className={`font-[600] text-[16px] md:text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              }`}
            >
              Running Events
            </h5>
          </div>
          <div
            className="flex items-center cursor-pointer pr-5 md:pr-10"
            onClick={() => setActive(3)}
          >
            <h5
              className={`font-[600] text-[16px] md:text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              }`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        {isOwner && (
          <div className="mt-3 md:mt-0">
            <Link to="/dashboard">
              <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                <span className="text-[#fff]">Go Dashboard</span>
              </div>
            </Link>
          </div>
        )}
      </div>

      <br />

      {/* Tab Content */}
      {active === 1 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-12">
          {products && products.map((i, index) => (
            <ProductCard data={i} key={index} isShop={true} />
          ))}
          {products && products.length === 0 && (
            <h5 className="w-full text-center col-span-full py-5 text-[18px]">
              No Products for this shop yet!
            </h5>
          )}
        </div>
      )}

      {active === 2 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-12">
          {events &&
            events.map((i, index) => (
              <ProductCard
                data={i}
                key={index}
                isShop={true}
                isEvent={true}
              />
            ))}
          {events && events.length === 0 && (
            <h5 className="w-full text-center col-span-full py-5 text-[18px]">
              No Events for this shop yet!
            </h5>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div
                className="w-full flex flex-col sm:flex-row items-center sm:items-start my-4"
                key={index}
              >
                <img
                  src={`${item.user.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt="Reviewer Avatar"
                />
                <div className="pl-2 mt-2 sm:mt-0">
                  <div className="flex items-center">
                    <h1 className="font-[600] pr-2">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
                  <p className="text-[#000000a7] text-[14px]">{"2 days ago"}</p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Reviews for this shop yet!
            </h5>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
