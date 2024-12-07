import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import UserOrderDetails from "../components/UserOrderDetails";
import FooterNav from '../components/Layout/FooterNav';

const OrderDetailsPage = () => {
  return (
    <div>
        <Header />
        <UserOrderDetails />
        <Footer />
        <FooterNav />
    </div>
  )
}

export default OrderDetailsPage