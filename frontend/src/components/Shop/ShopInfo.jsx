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
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full py-5 bg-white rounded-lg shadow-md">
          {/* Avatar Section */}
          <div className="w-full flex flex-col items-center">
            <img
              src={`${data.avatar?.url}`}
              alt="Shop Avatar"
              className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] object-cover rounded-full"
            />
            <h3 className="text-center py-2 text-[18px] md:text-[20px] font-semibold">
              {data.name}
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#000000a6] px-4 text-center line-clamp-2">
              {data.description}
            </p>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div>
              <h5 className="font-semibold text-[14px]">Address</h5>
              <p className="text-[14px] text-[#000000a6]">{data.address}</p>
            </div>
            <div>
              <h5 className="font-semibold text-[14px]">Phone Number</h5>
              <p className="text-[14px] text-[#000000a6]">{data.phoneNumber}</p>
            </div>
            <div>
              <h5 className="font-semibold text-[14px]">Total Products</h5>
              <p className="text-[14px] text-[#000000a6]">
                {products && products.length}
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-[14px]">Shop Ratings</h5>
              <p className="text-[14px] text-[#000000b0]">
                {averageRating.toFixed(1)}/5
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-[14px]">Joined On</h5>
              <p className="text-[14px] text-[#000000b0]">
                {data?.createdAt?.slice(0, 10)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {isOwner && (
            <div className="px-4 py-3 space-y-3">
              <Link to="/settings">
                <button
                  className={`${styles.button} w-full h-[42px] rounded-md text-white`}
                >
                  Edit Shop
                </button>
              </Link>
              <button
                className={`${styles.button} w-full h-[42px] rounded-md text-white`}
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

export default ShopInfo;
