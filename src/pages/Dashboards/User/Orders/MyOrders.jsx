import React, { useState, useEffect } from 'react';
import { Search, RefreshCcw, FileText, Package, Star, Clock, CheckCircle, XCircle } from 'lucide-react';
import { addToArchiveOrders, removeFromArchiveOrders } from '../../../../redux/slices/archiveOrdersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaTruckArrowRight } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  const archiveOrders = useSelector((state) => state.archiveOrders.items);
  const dispatch = useDispatch();
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  const handleTrackOrder = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/user-order-details/${id}`);
      if (response.data.success) {
        navigate(`/dashboard/user/home/order/track-order/${id}`);
        
      }
    } catch (error) {
      console.error(error);
    }
  };
  const isInArchive = archiveOrders.some(item => item._id === order._id);
  const handleArchiveOrder = (order) => () => {
    
    if (isInArchive) {
      dispatch(removeFromArchiveOrders(order._id));
    } else {
      dispatch(addToArchiveOrders(order));
    }
    
  }

  

  

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6 transition-all duration-300 hover:shadow-md">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">ORDER PLACED</h3>
            <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
          </div>
          <div className="mt-2 sm:mt-0 text-right">
            <h3 className="text-lg font-semibold text-gray-800">TOTAL</h3>
            <p className="text-sm text-gray-600">₹{(order.payment.amount / 100).toFixed(2)}</p>
          </div>
          <div className="mt-2 sm:mt-0 text-right">
            <h3 className="text-lg font-semibold text-gray-800">SHIP TO</h3>
            <p className="text-sm text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
          </div>
          <div className="mt-2 sm:mt-0">
            <h3 className="text-lg font-semibold text-gray-500">ORDER # {order.payment.orderId}</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300">View order details</button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-lg flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-600" />
              {order.status}
              <span className="ml-2 text-sm font-normal text-gray-600">
                {order.status === 'Delivered' ? 'on ' + formatDate(order.createdAt) : 'Estimated delivery: ' + formatDate(order.createdAt)}
              </span>
            </h4>

          <p className="font-semibold text-gray-700">Payment Status: <span>{order.payment.status}</span></p>

          </div>
          {order.products.map((product, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200 last:border-b-0">
              <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0" />
              <div className="sm:ml-4 flex-grow">
                <h5 className="font-semibold text-gray-800 mb-1">{product.title}</h5>
                <p className="text-sm text-gray-600 mb-2">Qty: {product.quantity}</p>
                <div className="flex space-x-2">
                  <button className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-3 rounded-full transition-colors duration-300">
                    Buy again
                  </button>
                  <button className="text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-1 px-3 rounded-full transition-colors duration-300 flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Review product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-between items-center">
          <div className="space-x-2 mb-2">
            <button 
              onClick={() => handleTrackOrder(order._id)}
             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300">
              <FaTruckArrowRight className="w-4 h-4 mr-2" />
              Track Package
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Return or Replace Items
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition-colors duration-300">
              <FileText className="w-4 h-4 mr-2" />
              View Invoice
            </button>
          </div>
          <button
            onClick={handleArchiveOrder(order)}
           className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-300 mb-2">
              {isInArchive ?<p>Remove from Archive</p> : <p>Archive Order</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

const MyOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [orders, setOrders] = useState([]);

  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/user-orders`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order.products.some(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Orders</h1>

      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-lg shadow-sm">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search all orders"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex space-x-4">
          <select
            className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All</option>
            <option>Delivered</option>
            <option>Shipped</option>
            <option>Pending</option>
          </select>
          <select
            className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option>Last 30 days</option>
            <option>Past 3 months</option>
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <OrderItem key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;