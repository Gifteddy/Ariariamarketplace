import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { PaystackButton } from "react-paystack"; // Import Paystack Button

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddressValidation = () => {
    if (!address1 || !address2 || !zipCode || !country || !city) {
      toast.error("Please choose your delivery address!");
      return false;
    }
    return true;
  };

  const paymentSubmit = async () => {
    if (handleAddressValidation()) {
      const shippingAddress = { address1, address2, zipCode, country, city };
      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const shipping = subTotalPrice * 0.1;

  const handleCouponValidation = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${server}/coupon/get-coupon-value/${couponCode}`);
      const { shopId, value } = data.couponCode || {};

      if (shopId && value) {
        const isCouponValid = cart.filter((item) => item.shopId === shopId);
        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discount = (eligiblePrice * value) / 100;
          setDiscountPrice(discount);
          setCouponCodeData(data.couponCode);
          setCouponCode("");
        }
      } else {
        toast.error("Coupon code doesn't exist!");
        setCouponCode("");
      }
    } catch (error) {
      toast.error("Error applying coupon");
    }
  };

  const discountPercent = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercent).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: totalPrice * 100, // Convert amount to kobo (Naira smallest unit)
    publicKey: 'pk_live_8b4ffab8296eb5c9b6560763376bc50e9c61e11c',
  };

  const onSuccess = async (response) => {
    try {
      const order = {
        cart,
        user,
        shippingAddress: { address1, address2, zipCode, country, city },
        totalPrice,
        paymentType: "Paystack",
        paymentStatus: "Paid",
      };
// Create the order using the axios POST request
await axios.post(`${server}/order/create-order`, order);

// Display success toast
toast.success("Order creation successful");

// Clear the cart and order from localStorage
localStorage.removeItem("cartItems");
localStorage.removeItem("latestOrder");

// Navigate to the /order-success page first
navigate("/order-success");

// After a 1-second delay, navigate to the /order/success page
setTimeout(() => {
  navigate("/order/success");
}, 1000);  // 1 second delay

// Refresh the page
window.location.reload();

    } catch (error) {
      toast.error("Failed to create order after payment");
    }
  };

  const onClose = () => {
    toast.error("Payment closed without completing");
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleCouponValidation}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercent={discountPercent}
          />
        </div>
      </div>

      <PaystackButton
        {...paystackConfig}
        text="Pay Now"
        onSuccess={onSuccess}
        onClose={onClose}
        className="w-[150px] 800px:w-[280px] mt-10 px-4 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-[#1e40af] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#1e40af] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-50 transition duration-300"
      />
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => (
  <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
    <h5 className="text-[18px] font-[500]">Shipping Address</h5>
    <form>
      <div className="w-full flex pb-3">
        <div className="w-[50%]">
          <label className="block pb-2">Full Name</label>
          <input
            type="text"
            value={user?.name}
            required
            className={`${styles.input} !w-[95%]`}
          />
        </div>
        <div className="w-[50%]">
          <label className="block pb-2">Email Address</label>
          <input
            type="email"
            value={user?.email}
            required
            className={`${styles.input}`}
          />
        </div>
      </div>

      <div className="w-full flex pb-3">
        <div className="w-[50%]">
          <label className="block pb-2">Phone Number</label>
          <input
            type="number"
            value={user?.phoneNumber}
            required
            className={`${styles.input} !w-[95%]`}
          />
        </div>
        <div className="w-[50%]">
          <label className="block pb-2">Zip Code</label>
          <input
            type="number"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
            className={`${styles.input}`}
          />
        </div>
      </div>

      <div className="w-full flex pb-3">
        <div className="w-[50%]">
          <label className="block pb-2">Country</label>
          <select
            className="w-[95%] border h-[40px] rounded-[5px]"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Choose your country</option>
            {Country &&
              Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="w-[50%]">
          <label className="block pb-2">City</label>
          <select
            className="w-[95%] border h-[40px] rounded-[5px]"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Choose your City</option>
            {State &&
              State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="w-full flex pb-3">
        <div className="w-[50%]">
          <label className="block pb-2">Address1</label>
          <input
            type="address"
            required
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className={`${styles.input} !w-[95%]`}
          />
        </div>
        <div className="w-[50%]">
          <label className="block pb-2">Address2</label>
          <input
            type="address"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            required
            className={`${styles.input}`}
          />
        </div>
      </div>
    </form>
  </div>
);

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercent,
}) => (
  <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
    <div className="flex justify-between">
      <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
      <h5 className="text-[18px] font-[600]">₦{subTotalPrice}</h5>
    </div>
    <br />
    <div className="flex justify-between">
      <h3 className="text-[16px] font-[400] text-[#000000a4]">Service charge:</h3>
      <h5 className="text-[18px] font-[600]">₦{shipping.toFixed(2)}</h5>
    </div>
    <br />
    <div className="flex justify-between border-b pb-3">
      <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
      <h5 className="text-[18px] font-[600]">
        - {discountPercent ? "₦" + discountPercent.toFixed(2) : null}
      </h5>
    </div>
    <h5 className="text-[18px] font-[600] text-end pt-3">₦{totalPrice}</h5>
    <br />
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className={`${styles.input} h-[40px] pl-2`}
        placeholder="Coupon code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        required
      />
      <input
        className="w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer"
        required
        value="Apply code"
        type="submit"
      />
    </form>
  </div>
);

export default Checkout;
