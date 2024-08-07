import React from 'react'
import { Routes,Route } from 'react-router-dom'

import Homepage from './Homepage'
import PageNotFound from './PageNotFound'
import RegsiterPage from './Auth/RegsiterPage'
import LoginPage from './Auth/LoginPage'
import ForgotPassword from './Auth/ForgotPassword'
import OrderTracking from './OrderTracking'

// Products Releated Routes
import ProductsHome from '../components/Products/ProductsHome'
import CategoryBasedProducts from '../components/Products/CategoryBasedProducts'
import Cart from '../components/Cart'
import Wishlist from '../components/Wishlist'
import ProductDetails from "../components/Products/ProductDetails"




// Dashboard Pages - USER
import WelcomeDashboard from './Dashboards/User/WelcomeDashboard'
import UserDashboardHome from './Dashboards/User/UserDashboardHome'
import MainDashboardHome from './Dashboards/User/MainDashboardHome'
import FAQ from './Dashboards/User/CustomerSupport/FAQ'
import ContactSupport from './Dashboards/User/CustomerSupport/ContactForm'
import CreateTicket from './Dashboards/User/Support Tickets/CreateTicket'
import UserTicketList from './Dashboards/User/Support Tickets/UserTicketList'
import UserTicketDetail from './Dashboards/User/Support Tickets/UserTicketDetail'
import MyProfile from './Dashboards/User/My Account/MyProfile'
import CreateBlog from './Dashboards/User/BlogManagement/CreateBlog'
import UserDashCart from './Dashboards/User/Cart/UserDashCart'
import AllProducts from './Dashboards/User/Products/AllProducts'
import BrowseCategories from './Dashboards/User/Products/BrowseCategories'



// ADMIN Dashboard
import MainDashboard from './Dashboards/Admin/MainDashboard'
import PrivateRoutes from './PrivateRoutes'
import CreateAdminCategory from "./Dashboards/Admin/Categories/CreateAdminCategory"
import AdminPrivateRoute from "./AdminPrivateRoute"
import AdminSidebar from "./Dashboards/Admin/AdminSidebar"
import UsersContactUsDetails from './Dashboards/Admin/ContactForms/UsersContactUsDetails'
import AdminTicketDetail from './Dashboards/Admin/Support Ticket/AdminTicketDetail'
import AdminTicketList from './Dashboards/Admin/Support Ticket/AdminTicketList'
import TicketStatistics from './Dashboards/Admin/Support Ticket/TicketStatistics'
import AllUsers from './Dashboards/Admin/Users/AllUsers'
import CreateNewUser from './Dashboards/Admin/Users/CreateNewUser'
import CreateCoupons from './Dashboards/Admin/Coupons/CreateCoupons'
import AllCoupons from './Dashboards/Admin/Coupons/AllCoupons'

// import AdminPrivateRoutes from './AdminPrivateRoute'
import HomeDashboard from './Dashboards/Admin/HomeDashboard'
import AllCategories from './Dashboards/Admin/Categories/AllCategories'
import CreateProduct from './Dashboards/Admin/Products/CreateProduct'
import ManageProduct from './Dashboards/Admin/Products/ManageProduct'

const RoutePath = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
           
            <Route path="/register" element={<RegsiterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/products/all" element={<ProductsHome/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/categories/:slug' element={<CategoryBasedProducts/>}/>
            <Route path='/product/:slug' element={<ProductDetails/>}/>
            <Route path='/order-tracking' element={<OrderTracking/>}/>

            <Route path="*" element={<PageNotFound/>}/>





            {/* USER Dashboard */}
            <Route path='/dashboard/user' element={<PrivateRoutes/>}>
                <Route path="" element={<WelcomeDashboard/>}/>
                <Route path="home" element={<UserDashboardHome/>}>
                  <Route path="" element={<MainDashboardHome/>}/>
                  <Route path="customer-support/faq" element={<FAQ/>}/>
                  <Route path="customer-support/contact" element={<ContactSupport/>}/>
                  <Route path="customer-support/create-ticket" element={<CreateTicket/>}/>
                  <Route path="customer-support/my-tickets" element={<UserTicketList/>}/>
                  <Route path="customer-support/ticket/:id" element={<UserTicketDetail/>}/>
                  <Route path="my-account/my-profile" element={<MyProfile/>}/>
                  <Route path="blog-management/create-blog" element={<CreateBlog/>}/>
                  <Route path="cart" element={<UserDashCart/>}/>
                  <Route path="products/all" element={<AllProducts/>}/>
                  <Route path="products/categories" element={<BrowseCategories/>}/>









                </Route>
                

                
         </Route>

            
            {/* ADMIN Dashboard */}
           
            <Route path='/dashboard/admin' element={<AdminPrivateRoute/>}>
            <Route path='' element={<AdminSidebar/>}>
                  <Route path='' element={<HomeDashboard/>}/>
                  {/* Category Routes */}
                  <Route path='categories/create' element={<CreateAdminCategory/>}/>            
                  <Route path='categories/all' element={<AllCategories/>}/>   

                  {/* Product Routes */}
                  <Route path='product/create' element={<CreateProduct/>}/>
                  <Route path='product/manage' element={<ManageProduct/>}/> 

                  <Route path='contact-us-data' element={<UsersContactUsDetails/>}/>
                  <Route path='support-tickets/tickets' element={<AdminTicketList/>}/>
                  <Route path='support-tickets/stats' element={<TicketStatistics/>}/>
                  <Route path='support-tickets/:id' element={<AdminTicketDetail/>}/>
                  <Route path='users/all' element={<AllUsers/>}/>
                  <Route path='users/create' element={<CreateNewUser/>}/>

                  <Route path='coupons/create' element={<CreateCoupons/>}/>
                  <Route path='coupons/all' element={<AllCoupons/>}/>



           </Route>


            </Route>

            {/* USER Dashboard */}
            
        </Routes>
    </>
  )
}

export default RoutePath