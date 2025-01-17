import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import EditProduct from "../../components/Shop/EditProduct";
import FooterNav from '../../components/Layout/FooterNav';

const ShopEditProduct = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={3} />
            </div>
            <div className="w-full justify-center flex">
                <EditProduct />
            </div>
          </div><br />
          <FooterNav />
    </div>
  )
}

export default ShopEditProduct