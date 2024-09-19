import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Truck, Home, CheckCircle, MapPin, Calendar, Clock, ShoppingBag, CreditCard, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const fetchOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/orders/user-order-details/${orderId}`);
    if (response.data.success) {
      return response.data.order;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
};

const OrderStatus = ({ currentStatus }) => {
  const statuses = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="mb-12 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Status</h2>
      <div className="flex items-center justify-between">
        {statuses.map((status, index) => (
          <div key={status} className="flex flex-col items-center w-1/5">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${index <= currentIndex ? 'bg-green-500 text-white' : 'bg-gray-200'} transition-all duration-300 ease-in-out`}>
              {index < currentIndex ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                index === 0 ? <ShoppingBag className="w-6 h-6" /> :
                index === 1 ? <Package className="w-6 h-6" /> :
                index === 2 ? <Truck className="w-6 h-6" /> :
                index === 3 ? <Home className="w-6 h-6" /> :
                <CheckCircle className="w-6 h-6" />
              )}
            </div>
            <span className={`text-sm text-center ${index <= currentIndex ? 'text-green-500 font-semibold' : 'text-gray-500'}`}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrackingTimeline = ({ events }) => (
  <div className="mb-8 bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tracking Timeline</h2>
    <div className="border-l-2 border-blue-200 pl-6 ml-3">
      {events.map((event, index) => (
        <motion.div 
          key={index} 
          className="mb-6 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="absolute -left-9 mt-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-sm text-gray-600 font-medium">{event.date}</span>
            <Clock className="w-5 h-5 ml-4 mr-2 text-blue-500" />
            <span className="text-sm text-gray-600 font-medium">{event.time}</span>
          </div>
          <p className="text-gray-800 font-semibold">{event.status}</p>
          <p className="text-sm text-gray-600">{event.location}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const OrderDetails = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Order Details</h2>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-600 focus:outline-none transition-colors duration-200"
        >
          {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Order Date</p>
          <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
          <p className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Payment Method</p>
          <p className="font-medium flex items-center">
            <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
            {order.payment.modeOfPayment}
          </p>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-semibold mb-3 text-gray-700">Items in Your Order</h3>
            {order.products.map((item, index) => (
              <div key={index} className="flex items-center py-3 border-b last:border-b-0">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm font-medium text-blue-500">₹{item.price}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ShippingDetails = ({ shippingInfo }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Shipping Details</h2>
    <div className="flex items-start mb-4">
      <MapPin className="w-5 h-5 mr-3 text-blue-500 mt-1" />
      <div>
        <p className="font-medium text-gray-700">Delivery Address</p>
        <p className="text-sm text-gray-600">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.country}</p>
      </div>
    </div>
    <div className="flex items-center">
      <Truck className="w-5 h-5 mr-3 text-blue-500" />
      <div>
        <p className="font-medium text-gray-700">Shipping Method</p>
        <p className="text-sm text-gray-600">{shippingInfo.method}</p>
      </div>
    </div>
  </div>
);

const OrderTrackingPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const orderId = id;

  useEffect(() => {
    const fetchOrder = async () => {
      const fetchedOrder = await fetchOrderDetails(orderId);
      if (fetchedOrder) {
        setOrder(fetchedOrder);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order Not Found</h2>
        <p className="text-gray-600">We couldn't find the order you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Track Your Order</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Order ID</h2>
              <p className="text-2xl font-bold text-blue-600">{order.payment.orderId}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Transaction ID</h2>
              <p className="text-2xl font-bold text-blue-600">{order.payment.paymentId}</p>
            </div>
          </div>
        </div>
        
        <OrderStatus currentStatus={order.status} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TrackingTimeline
              events={[
                { date: new Date(order.createdAt).toLocaleDateString(), time: new Date(order.createdAt).toLocaleTimeString(), status: 'Order placed', location: 'Online' },
                ...order.orderStatusUpdates.map((update) => ({
                  date: new Date(update.timestamp).toLocaleDateString(),
                  time: new Date(update.timestamp).toLocaleTimeString(),
                  status: update.status,
                  location: update.location,
                })),
                { date: new Date(order.estimatedDelivery).toLocaleDateString(), time: '', status: 'Estimated Delivery', location: '' }
              ]}
            />
          </div>
          <div>
            <OrderDetails order={order} />
            <ShippingDetails shippingInfo={order.shippingAddress} />
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Having trouble with your order?
          </p>
          <a 
            href="#" 
            className="inline-block bg-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            Contact Our Support Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;