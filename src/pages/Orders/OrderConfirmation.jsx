import React, { useState, useEffect } from 'react';
import { CheckCircle, Truck, CreditCard, PhoneCall, ChevronRight, ShoppingBag, DownloadIcon, MapPin, Calendar, Clock, DollarSign } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const orderDetails = state?.order;
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth'))?.user);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    setAuth(storedAuth?.user);
  }, []);

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  if (orderDetails === undefined) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white shadow-2xl rounded-2xl p-8">
          <div className="bg-red-100 border-l-4 border-red-400 p-4 rounded-r-xl mb-8">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Access Restricted</h2>
            <p className="text-red-600">You can only view this page after completing your order. If you have just completed your payment, please ensure you have been redirected here from the checkout process. If you are facing issues, please check your order status or contact our support team for assistance.

          </p>
          </div>
          <button 
            onClick={() => navigate('/cart')} 
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order Confirmation - EtherShop</title>
      </Helmet>
      <Navbar />
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12">
        <motion.div 
          className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Order Confirmed</h1>
            <CheckCircle className="text-white" size={40} />
          </div>
          <div className="p-8">
            <motion.div className="mb-8" {...fadeIn}>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl">
                <h2 className="text-xl font-semibold text-green-700 mb-2">Thank you for your purchase!</h2>
                <p className="text-green-600">
                  Your order has been successfully placed and is being processed. We'll send you updates via email.
                </p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <motion.div className="bg-gray-50 p-6 rounded-xl shadow-inner" {...fadeIn}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <ShoppingBag className="mr-2 text-blue-500" size={24} />
                  Order Details
                </h3>
                <p className="mb-2"><span className="font-medium">Order Number:</span> {orderDetails.payment.orderId}</p>
                <p className="mb-2"><span className="font-medium">Order Date:</span> {formatDate(orderDetails.createdAt)}</p>
                <p><span className="font-medium">Status:</span> <span className="text-green-500 font-semibold">{orderDetails.status}</span></p>
              </motion.div>
              <motion.div className="bg-gray-50 p-6 rounded-xl shadow-inner" {...fadeIn}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <PhoneCall className="mr-2 text-blue-500" size={24} />
                  Customer Information
                </h3>
                <p className="mb-2"><span className="font-medium">Name:</span> {auth.fullName}</p>
                <p><span className="font-medium">Email:</span> {auth.email}</p>
              </motion.div>
            </div>
            <motion.div className="mb-8" {...fadeIn}>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <DollarSign className="mr-2 text-blue-500" size={24} />
                Order Summary
              </h3>
              <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                {orderDetails.products.map((product, index) => (
                  <div key={index} className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
                    <span className="font-medium">{product.title} <span className="text-gray-500">x{product.quantity}</span></span>
                    <span className="font-semibold">₹ {product.price}</span>
                  </div>
                ))}
                <div className="border-t-2 border-gray-300 mt-4 pt-4">
                  <div className="flex justify-between items-center font-semibold text-xl">
                    <span>Total</span>
                    <span className="text-blue-600">₹ {orderDetails.payment.amount}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <motion.div className="bg-gray-50 p-6 rounded-xl shadow-inner" {...fadeIn}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <MapPin className="mr-2 text-blue-500" size={24} />
                  Shipping Address
                </h3>
                <p className="text-gray-700 mb-1">{orderDetails.shippingAddress.address}</p>
                <p className="text-gray-700 mb-1">{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.postalCode}</p>
                <p className="text-gray-700">{orderDetails.shippingAddress.country}</p>
              </motion.div>
              <motion.div className="bg-gray-50 p-6 rounded-xl shadow-inner" {...fadeIn}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="mr-2 text-blue-500" size={24} />
                  Payment Details
                </h3>
                <p className="text-gray-700 mb-2">Transaction ID: <span className="font-semibold">{orderDetails.payment.paymentId}</span></p>
                <p className="text-gray-700 mb-2">Status: <span className="font-semibold text-green-500">{orderDetails.payment.status}</span></p>
                <p className="text-gray-700">Method: <span className="font-semibold text-green-500">{orderDetails.payment.modeOfPayment} </span> </p>
              </motion.div>
            </div>
            <motion.div className="bg-gray-50 p-6 rounded-xl shadow-inner mb-8" {...fadeIn}>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Truck className="mr-2 text-blue-500" size={24} />
                Shipping Information
              </h3>
              <p className="text-gray-700 mb-2">Method: {orderDetails.shippingMethod}</p>
              <p className="text-gray-700 flex items-center">
                <Calendar className="mr-2 text-gray-500" size={18} />
                Estimated Delivery: {formatDate(orderDetails.estimatedDelivery)}
              </p>
            </motion.div>
          </div>
          <motion.div 
            className="bg-gray-100 p-6 flex flex-col sm:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300" onClick={() => navigate('/products')}>
              Continue Shopping
            </button>
            <button className="w-full sm:w-auto bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition duration-300" onClick={() => navigate('/orders')}>
              <Link to={`/dashboard/${auth.role}`}>Go To Dashboard</Link>
            </button>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
