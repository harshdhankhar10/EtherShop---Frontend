import React from 'react'
import CustomerOverview from "./Main Dashboard Components/CustomerOverview"
import InventoryStatus from "./Main Dashboard Components/InventoryStatus"
import LatestCustomerReviews from "./Main Dashboard Components/LatestCustomerReviews"
import MarketingCampaign from "./Main Dashboard Components/MarketingCampaignsPerformance"
import OrderStatusBreakdown from "./Main Dashboard Components/OrderStatusBreakdown"
import RecentOrders from "./Main Dashboard Components/RecentOrders"
import RevenueChart from "./Main Dashboard Components/RevenueChart"
import SalesOverview from "./Main Dashboard Components/SalesOverview"
import SystemNotifications from "./Main Dashboard Components/SystemNotifications"
import TopSellingProducts from "./Main Dashboard Components/TopSellingProducts"

const HomeDashboard = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="col-span-12 lg:col-span-4 mb-4 bg-white rounded-lg shadow-sm p-6">
          <SalesOverview />
        </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-lg shadow-sm p-6">
          <RevenueChart />
        </div>
        
     
        
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-lg shadow-sm p-6">
          <CustomerOverview />
        </div>
        
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-lg shadow-sm p-6">
          <InventoryStatus />
        </div>
        
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-lg shadow-sm p-6">
          <OrderStatusBreakdown />
        </div>
        
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-lg shadow-sm p-6">
          <TopSellingProducts />
        </div>
        
        <div className="col-span-12 lg:col-span-12 bg-white rounded-lg shadow-sm p-6">
          <RecentOrders />
        </div>
        
       
      </div>
    </div>
  )
}

export default HomeDashboard    