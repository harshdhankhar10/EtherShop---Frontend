import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Star, RefreshCcw, FileText } from 'lucide-react';
import axios from 'axios';

const ProductItem = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-6">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row">
          <img
            src={product.image || 'https://via.placeholder.com/120'}
            alt={product.title}
            className="sm:w-30 h-44 w-64 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
          />
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
            <p className="text-sm text-gray-600 mb-2">Order #: {product.payment.orderId}</p>
            <p className="text-lg font-bold text-gray-800 mb-2">₹{(product.price * product.quantity).toFixed(2)}</p>
            <p className="text-sm text-gray-600 mb-2">Quantity: {product.quantity}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
              Buy Again
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition duration-300">
              View Product
            </button>
          </div>
          <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide Details' : 'View Details'}
            {isExpanded ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
          </button>
        </div>
        {isExpanded && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Shipping Address</h4>
            <p className="text-sm text-gray-600 mb-2">{product.shippingAddress.address}</p>
            <p className="text-sm text-gray-600">{product.shippingAddress.city}, {product.shippingAddress.country} - {product.shippingAddress.postalCode}</p>

            <h4 className="font-semibold mt-4 mb-2">Order Status</h4>
            <p className="text-sm text-gray-600 mb-2">{product.status}</p>
            <p className="text-sm text-gray-600">Payment Status: {product.payment.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const OrderHistoryProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOption, setSortOption] = useState('date');
  const [orders, setOrders] = useState([]);

  // API call to fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/user-all-orders`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Filter and sort orders based on user input
  const filteredOrders = orders
    .filter(order => order.products.some(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())))
    .sort((a, b) => {
      if (sortOption === 'price_high') {
        return b.products[0].price - a.products[0].price;
      }
      if (sortOption === 'price_low') {
        return a.products[0].price - b.products[0].price;
      }
      return new Date(b.createdAt) - new Date(a.createdAt); // Sort by date
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Purchase History</h1>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search products"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex space-x-4 w-full sm:w-auto">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Smart Home</option>
            <option>Furniture</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="price_high">Price: High to Low</option>
            <option value="price_low">Price: Low to High</option>
          </select>
        </div>
      </div>

      {/* Displaying API fetched orders */}
      <div className="space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            order.products.map(product => (
              <ProductItem key={product._id} product={{ ...product, shippingAddress: order.shippingAddress, payment: order.payment, status: order.status }} />
            ))
          ))
        ) : (
          <p className="text-center text-gray-600">No orders found.</p>
        )}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button className="text-blue-600 hover:text-blue-800 flex items-center">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Load More Products
        </button>
        <button className="text-blue-600 hover:text-blue-800 flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Download Purchase History
        </button>
      </div>
    </div>
  );
};

export default OrderHistoryProductsPage;
