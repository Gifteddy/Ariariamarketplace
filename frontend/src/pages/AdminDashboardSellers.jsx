import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import AllSellers from "../components/Admin/AllSellers";
import FooterNav from '../components/Layout/FooterNav';

const AdminDashboardSellers = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={3} />
        </div>
        <AllSellers />
      </div>
    </div>
    <FooterNav />
  </div>
  )
}

export default AdminDashboardSellers