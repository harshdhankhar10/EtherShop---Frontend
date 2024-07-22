import React,{useEffect} from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const MainDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
     <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="w-full bg-white shadow-md">
        <AdminSidebar />
      </div>
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet /> 
       </div>
    </div>
  )
}

export default MainDashboard