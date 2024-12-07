import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import Footer from '../../components/Layout/Footer'
import OrderDetails from "../../components/Shop/OrderDetails";
import FooterNav from '../../components/Layout/FooterNav';

const ShopOrderDetails = () => {
  return (
    <div>
         <DashboardHeader />
         <OrderDetails />
          <Footer />
          <FooterNav />
    </div>
  )
}

export default ShopOrderDetails