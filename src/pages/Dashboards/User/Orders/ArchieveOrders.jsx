import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Package, Calendar, RefreshCcw, ArrowUpRight, Trash2 } from 'lucide-react';
import { removeFromArchiveOrders } from '../../../../redux/slices/archiveOrdersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ArchivedOrderItem = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth'))?.user || {});
  
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  const dispatch = useDispatch();
  const handleRemoveFromArchive = (id) => () => {
    dispatch(removeFromArchiveOrders(id));
    toast.success('Order removed from archive');
  }

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden mb-6">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">ORDER:  {order.status}</h3>
            <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
          </div>
          <div className="mt-2 sm:mt-0 text-right">
            <h3 className="text-lg font-semibold text-gray-800">TOTAL</h3>
            <p className="text-sm text-gray-600">₹{order.payment.amount}</p>
          </div>
          <div className="mt-2 sm:mt-0 text-right">
            <h3 className="text-lg font-semibold text-gray-800">SHIP TO</h3>
            <p className="text-sm text-gray-600">{auth.fullName}</p>
          </div>
          <div className="mt-2 sm:mt-0">
            <h3 className="text-lg font-semibold text-gray-800">ORDER # {order.payment.orderId}</h3>
            <button 
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Hide details' : 'View details'}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <h4 className="font-semibold text-lg mb-2 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Order Details
            </h4>
            {order.products.map((product, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200 last:border-b-0">
                <img src={`${product.image}`} alt={product.name} className="w-24 h-24 object-cover rounded mb-4 sm:mb-0" />
                <div className="sm:ml-4 flex-grow">
                  <h5 className="font-semibold text-gray-800 mb-1">{product.title}</h5>
                  <p className="text-sm text-gray-600 mb-2">Qty: {product.quantity}</p>
                  <p className="text-sm text-gray-600">Price: ${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-sm text-gray-600"><strong>Shipping Address:</strong> {order.shippingAddress.address}</p>
              <p className="text-sm text-gray-600"><strong>Payment Method:</strong> {order.payment.modeOfPayment}</p>
              <p className="text-sm text-gray-600"><strong>Order Status:</strong> {order.status}</p>
              {order.deliveryDate && <p className="text-sm text-gray-600"><strong>Delivery Date:</strong> {formatDate(order.estimatedDelivery)}</p>}
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-between items-center">
          <div className="space-x-2 mb-2">
          
            <button className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-300">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              View Invoice
            </button>
          </div>
          <button
            onClick={handleRemoveFromArchive(order._id)}
           className="inline-flex items-center px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100 transition-colors duration-300 mb-2">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete from archive
          </button>
        </div>
      </div>
    </div>
  );
};

const ArchiveOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('All');
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('archiveOrders')) || []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Archived Orders</h1>
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search archived orders"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex space-x-4">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option>All</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {orders.map(order => (
          <ArchivedOrderItem key={order.id} order={order} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">Archived orders are kept for 18 months. To view older orders, please contact customer service.</p>
      </div>
    </div>
  );
};

export default ArchiveOrders;