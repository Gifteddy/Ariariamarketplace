import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { PaystackButton } from "react-paystack";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [paystackPublicKey, setPaystackPublicKey] = useState("");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaystackKey = async () => {
      try {
        const response = await axios.get("/paystack-public-key");
        setPaystackPublicKey(response.data.publicKey);
      } catch (error) {
        console.error("Error fetching Paystack public key", error);
        toast.error("Failed to load payment options.");
      }
    };

    fetchPaystackKey();

    const storedOrderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(storedOrderData);
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user,
    totalPrice: orderData?.totalPrice,
  };

  const handlePaystackSuccessAction = async (reference) => {
    const config = { headers: { "Content-Type": "application/json" } };
    order.paymentInfo = {
      id: reference.reference,
      status: "succeeded",
      type: "Paystack",
    };

    try {
      await axios.post("/order/create-order", order, config);
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      navigate("/order/success");
      window.location.reload();
    } catch (error) {
      toast.error("Order failed. Please try again.");
    }
  };

  const handlePaystackCloseAction = () => {
    toast.info("Transaction was not completed.");
  };

  const cashOnDeliveryHandler = async () => {
    const config = { headers: { "Content-Type": "application/json" } };
    order.paymentInfo = { type: "Cash On Delivery" };

    try {
      await axios.post("/order/create-order", order, config);
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      navigate("/order/success");
      window.location.reload();
    } catch (error) {
      toast.error("Order failed. Please try again.");
    }
  };

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: Math.round(orderData?.totalPrice * 100), // Amount in kobo
    publicKey: paystackPublicKey, // Use fetched public key
  };

  return (
    <div className="payment-container">
      <div className="payment-options">
        <div className="option">
          <h4>Pay with Paystack</h4>
          <PaystackButton
            {...paystackConfig}
            text="Pay Now"
            className="paystack-button"
            onSuccess={handlePaystackSuccessAction}
            onClose={handlePaystackCloseAction}
          />
        </div>
        
        <div className="option">
          <h4>Cash on Delivery</h4>
          <button onClick={cashOnDeliveryHandler} className="cod-button">
            Confirm
          </button>
        </div>
      </div>
      
      <CartData orderData={orderData} />
    </div>
  );
};

const CartData = ({ orderData }) => {
  return (
    <div className="cart-data">
      <div>
        <h3>Subtotal:</h3>
        <span>₦{orderData?.subTotalPrice.toLocaleString()}</span>
      </div>
      <div>
        <h3>Shipping:</h3>
        <span>₦{orderData?.shipping.toLocaleString()}</span>
      </div>
      <div>
        <h3>Discount:</h3>
        <span>-₦{orderData?.discountPrice.toLocaleString()}</span>
      </div>
      <h3>Total: ₦{orderData?.totalPrice.toLocaleString()}</h3>
    </div>
  );
};

export default Payment;
