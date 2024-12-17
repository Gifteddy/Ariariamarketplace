import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const { products } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const logoutHandler = async () => {
    await axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  const totalReviewsLength =
    products?.reduce((acc, product) => acc + product.reviews.length, 0) || 0;

  const totalRatings =
    products?.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    ) || 0;

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full py-6 bg-white rounded-xl shadow-xl mx-auto transition-transform duration-300 ease-in-out transform hover:scale-105">
          {/* Avatar Section */}
          <div className="w-full flex flex-col items-center text-center space-y-4">
            <img
              src={`${data.avatar?.url}`}
              alt="Shop Avatar"
              className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] object-cover rounded-full border-4 border-primary transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
            <h3 className="text-[20px] sm:text-[24px] font-semibold text-gray-900">
              {data.name}
            </h3>
            <p className="text-[14px] sm:text-[16px] text-gray-600 px-4">
              {data.description || "No description available."}
            </p>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 px-6">
            <DetailItem title="Address" value={data.address || "N/A"} />
            <DetailItem
              title="Phone Number"
              value={data.phoneNumber || "N/A"}
            />
            <DetailItem
              title="Total Products"
              value={products ? products.length : "0"}
            />
            <DetailItem
              title="Shop Ratings"
              value={`${averageRating.toFixed(1)}/5`}
            />
            <DetailItem
              title="Joined On"
              value={data?.createdAt?.slice(0, 10) || "N/A"}
            />
          </div>

          {/* Action Buttons */}
          {isOwner && (
            <div className="flex flex-col space-y-4 mt-8 px-6">
              <Link to="/settings">
                <button
                  className={`${styles.button} w-full h-[48px] rounded-md text-white transition-all duration-300 ease-in-out transform hover:bg-secondary`}
                >
                  Edit Shop
                </button>
              </Link>
              <button
                className={`${styles.button} w-full h-[48px] rounded-md text-white transition-all duration-300 ease-in-out transform hover:bg-red-600`}
                onClick={logoutHandler}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const DetailItem = ({ title, value }) => (
  <div className="transition-transform duration-300 transform hover:scale-105">
    <h5 className="font-semibold text-[14px] sm:text-[16px] text-gray-800">
      {title}
    </h5>
    <p className="text-[14px] sm:text-[15px] text-gray-600">{value}</p>
  </div>
);

export default ShopInfo;
