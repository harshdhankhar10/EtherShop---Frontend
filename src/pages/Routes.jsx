import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './Homepage';
import PageNotFound from './PageNotFound';
import RegisterPage from './Auth/RegsiterPage';
import LoginPage from './Auth/LoginPage';
import LoginWithEmailAndOTP from './Auth/LoginWithEmailAndOTP.jsx';
import ForgotPassword from './Auth/ForgotPassword';
import OrderTracking from './OrderTracking';
import ContactForm from '../components/ContactForm';
import PasswordReset from "../PasswordReset.jsx"
import Blog from "./Blog"
import MaintainancePage from "./MaintainancePage"
import Sitemap from "./Sitemap"



// Products Related Routes
import ProductsHome from '../components/Products/ProductsHome';
import CategoryBasedProducts from '../components/Products/CategoryBasedProducts';
import Cart from '../components/Cart';
import CheckoutPage from './CheckoutPage';
import Wishlist from '../components/Wishlist';
import ProductDetails from '../components/Products/ProductDetails';
import OfferPageHome from '../components/Offer Page/OfferPageHome';
import OrderConfirmation from "./Orders/OrderConfirmation.jsx";


// Dashboard Pages - USER
import PrivateRoutes from "./PrivateRoutes"
import WelcomeDashboard from './Dashboards/User/WelcomeDashboard';
import UserDashboardHome from './Dashboards/User/UserDashboardHome';
import MainDashboardHome from './Dashboards/User/MainDashboardHome';
import FAQ from './Dashboards/User/CustomerSupport/FAQ';
import ContactSupport from './Dashboards/User/CustomerSupport/ContactForm';
import CreateTicket from './Dashboards/User/Support Tickets/CreateTicket';
import UserTicketList from './Dashboards/User/Support Tickets/UserTicketList';
import UserTicketDetail from './Dashboards/User/Support Tickets/UserTicketDetail';
import MyProfile from './Dashboards/User/My Account/MyProfile';
import CreateBlog from './Dashboards/User/BlogManagement/CreateBlog';
import UserDashCart from './Dashboards/User/Cart/UserDashCart';
import AllProducts from './Dashboards/User/Products/AllProducts';
import BrowseCategories from './Dashboards/User/Products/BrowseCategories';
import NewChat from './Dashboards/User/AI Chatbot/NewChat';
import ChatHistory from './Dashboards/User/AI Chatbot/ChatHistory';
import ManageBlogs from './Dashboards/User/BlogManagement/ManageBlogs';
import ViewBlog from './Dashboards/User/BlogManagement/ViewBlog';
import MyOrders from './Dashboards/User/Orders/MyOrders';
import OrderHistory from './Dashboards/User/Orders/OrderHistory';
import TrackOrder from './Dashboards/User/Orders/TrackOrder';
import ArchieveOrders from './Dashboards/User/Orders/ArchieveOrders';
import BalanceSummary from './Dashboards/User/FundsManagement/BalanceSummary.jsx';
import PaymentMethods from './Dashboards/User/FundsManagement/PaymentMethods.jsx';
import TransactionHistory from './Dashboards/User/FundsManagement/TransactionHistory.jsx';
import AddFunds from './Dashboards/User/FundsManagement/AddFunds.jsx';
import PromoCodes from './Dashboards/User/FundsManagement/PromoCodes.jsx';




// ADMIN Dashboard
import MainDashboard from './Dashboards/Admin/MainDashboard';
import AdminPrivateRoute from './AdminPrivateRoute';
import CreateAdminCategory from './Dashboards/Admin/Categories/CreateAdminCategory';
import AdminSidebar from './Dashboards/Admin/AdminSidebar';
import UsersContactUsDetails from './Dashboards/Admin/ContactForms/UsersContactUsDetails';
import AdminTicketDetail from './Dashboards/Admin/Support Ticket/AdminTicketDetail';
import AdminTicketList from './Dashboards/Admin/Support Ticket/AdminTicketList';
import TicketStatistics from './Dashboards/Admin/Support Ticket/TicketStatistics';
import AllUsers from './Dashboards/Admin/Users/AllUsers';
import CreateNewUser from './Dashboards/Admin/Users/CreateNewUser';
import CreateCoupons from './Dashboards/Admin/Coupons/CreateCoupons';
import AllCoupons from './Dashboards/Admin/Coupons/AllCoupons';
import HomeDashboard from './Dashboards/Admin/HomeDashboard';
import AllCategories from './Dashboards/Admin/Categories/AllCategories';
import CreateProduct from './Dashboards/Admin/Products/CreateProduct';
import ManageProduct from './Dashboards/Admin/Products/ManageProduct';
import MaintenanceModePage from './Dashboards/Admin/Miscellaneous Setting/MaintainanceMode.jsx';
import AllOrders from './Dashboards/Admin/Orders/AllOrders';
import OrderAnalytics from './Dashboards/Admin/Orders/OrderAnalytics';
import OrderSettings from './Dashboards/Admin/Orders/OrderSettings';
import TrackOrderAdmin from './Dashboards/Admin/Orders/TrackOrder';
import ManageOrder from './Dashboards/Admin/Orders/ManageOrder.jsx';
import ViewOrderDetails from './Dashboards/Admin/Orders/ViewOrderDetails.jsx';



const RoutePath = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-email-otp" element={<LoginWithEmailAndOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/products/all" element={<ProductsHome />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/categories/:slug" element={<CategoryBasedProducts />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/order-tracking" element={<OrderTracking />} />
      <Route path="/contact" element={<ContactForm />} />
      <Route path="/reset/:token" element={<PasswordReset />} />
      <Route path="/blog/:id" element={<ViewBlog />} />
      <Route path="/maintainance-mode" element={<MaintainancePage />} />
      <Route path="/offers" element={<OfferPageHome />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/sitemap" element={<Sitemap />} />


      <Route path="*" element={<PageNotFound />} />



      {/* USER Dashboard */}
      <Route path="/dashboard/user" element={<PrivateRoutes />}>
        <Route path="" element={<WelcomeDashboard />} />
        <Route path="home" element={<UserDashboardHome />}>
          <Route path="" element={<MainDashboardHome />} />
          <Route path="customer-support/faq" element={<FAQ />} />
          <Route path="customer-support/contact" element={<ContactSupport />} />
          <Route path="customer-support/create-ticket" element={<CreateTicket />} />
          <Route path="customer-support/my-tickets" element={<UserTicketList />} />
          <Route path="customer-support/ticket/:id" element={<UserTicketDetail />} />
          <Route path="my-account/my-profile" element={<MyProfile />} />
          <Route path="blog-management/create-blog" element={<CreateBlog />} />
          <Route path="blog-management/manage-blogs" element={<ManageBlogs />} />
          <Route path="cart" element={<UserDashCart />} />
          <Route path="products/all" element={<AllProducts />} />
          <Route path="products/categories" element={<BrowseCategories />} />
          <Route path="chatbot/start" element={<NewChat />} />
          <Route path="chatbot/history" element={<ChatHistory />} />
          {/* Order related Routes */}
          <Route path="order/my-orders" element={<MyOrders />} />
          <Route path="order/order-history" element={<OrderHistory />} />
          <Route path="order/track-order/:id" element={<TrackOrder />} />
          <Route path="order/archieve-orders" element={<ArchieveOrders />} />

          {/* Funds Management */}
          <Route path="funds/balance-summary" element={<BalanceSummary />} />
          <Route path="funds/payment-methods" element={<PaymentMethods />} />
          <Route path="funds/transaction-history" element={<TransactionHistory />} />
          <Route path="funds/add-funds" element={<AddFunds />} />
          <Route path="funds/promo-codes" element={<PromoCodes />} />



        </Route>
      </Route>

      {/* ADMIN Dashboard */}
      <Route path="/dashboard/admin" element={<AdminPrivateRoute />}>
        <Route path="" element={<AdminSidebar />}>
          <Route path="" element={<HomeDashboard />} />
          {/* Category Routes */}
          <Route path="categories/create" element={<CreateAdminCategory />} />
          <Route path="categories/all" element={<AllCategories />} />
          {/* Product Routes */}
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="product/manage" element={<ManageProduct />} />
          {/* Order Routes */}
          <Route path="contact-us-data" element={<UsersContactUsDetails />} />

          {/* Support  Tickets Routes */}
          <Route path="support-tickets/tickets" element={<AdminTicketList />} />
          <Route path="support-tickets/stats" element={<TicketStatistics />} />
          <Route path="support-tickets/:id" element={<AdminTicketDetail />} />
          <Route path="users/all" element={<AllUsers />} />
          <Route path="users/create" element={<CreateNewUser />} />
          <Route path="coupons/create" element={<CreateCoupons />} />
          <Route path="coupons/all" element={<AllCoupons />} />
          <Route path="misc/maintainance" element={<MaintenanceModePage />} />

          {/* Orders Routes */}
          <Route path="orders/all" element={<AllOrders />} />
          <Route path="orders/analytics" element={<OrderAnalytics />} />
          <Route path="orders/settings" element={<OrderSettings />} />
          <Route path="orders/track-order/:id" element={<TrackOrderAdmin />} />
          <Route path="orders/manage-order/:id" element={<ManageOrder />} />
          <Route path="orders/view-order/:id" element={<ViewOrderDetails />} />



        </Route>
      </Route>
    </Routes>
  );
};

export default RoutePath;
