import React from 'react'
import Overview from './HomePagecomponents/Overview';
import RecentOrders from './HomePagecomponents/RecentOrders';
import Recommendations from './HomePagecomponents/Recommendations';
import QuickLinks from './HomePagecomponents/QuickLinks';
import AccountBalance from './HomePagecomponents/AccountBalance';
import OrderTracking from './HomePagecomponents/OrderTracking';
import PromotionalBanners from './HomePagecomponents/PromotionalBanners';
import Notifications from './HomePagecomponents/Notifications';
import SupportTickets from './HomePagecomponents/SupportTickets';
import RecentActivity from './HomePagecomponents/RecentActivity';


const MainDashboardHome = () => {
  return (
    <>
    <Overview/>
    <br/>
    <RecentOrders/>
    <br/>
    <Recommendations/>
    <br/>
    <QuickLinks/>
    <br/>
    <AccountBalance/>
    <br/>
    <OrderTracking/>
    <br/>
    <PromotionalBanners/>
    <br/>
    <Notifications/>
    <br/>
    <SupportTickets/>
    <br/>
    <RecentActivity/>
    </>
  )
}

export default MainDashboardHome;