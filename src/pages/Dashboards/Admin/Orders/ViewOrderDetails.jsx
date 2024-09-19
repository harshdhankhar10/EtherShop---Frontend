import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { CreditCardIcon, TruckIcon, PackageIcon, UserIcon, CalendarIcon, AlertCircleIcon } from 'lucide-react';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/order-details/${id}`);
        setOrder(response.data.order);
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to fetch order details. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const formatDate = (dateString) => format(new Date(dateString), 'MMM dd, yyyy HH:mm');

  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'successful':
          return 'bg-green-100 text-green-800';
        case 'cancelled':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-yellow-100 text-yellow-800';
      }
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md w-full flex items-center">
          <AlertCircleIcon className="h-6 w-6 mr-2" />
          <div>
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg max-w-md w-full flex items-center">
          <AlertCircleIcon className="h-6 w-6 mr-2" />
          <div>
            <p className="font-bold">No Data</p>
            <p>No order details found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex justify-between items-center">
         <div>
         <h1 className="text-2xl font-bold text-white">Order Details</h1>
         <p className="text-blue-100">Order ID: {order.payment.orderId}</p>
         </div>
         <div>
            <Link to={`/dashboard/admin/orders/manage-order/${id}`} ><button className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 hover:text-white">Update Order Status</button></Link>
         </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <PackageIcon className="mr-2" size={20} /> Order Summary
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <StatusBadge status={order.status} />
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span>{formatDate(order.createdAt)}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold">₹{order.payment.amount.toLocaleString()}</span>
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCardIcon className="mr-2" size={20} /> Payment Information
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <StatusBadge status={order.payment.status} />
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="capitalize">{order.payment.modeOfPayment}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="text-sm">{order.payment.paymentId}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TruckIcon className="mr-2" size={20} /> Shipping Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Delivery Address</h3>
                <p className="text-gray-600">{order.shippingAddress.address}</p>
                <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p className="text-gray-600">{order.shippingAddress.country}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Shipping Details</h3>
                <p className="text-gray-600">Method: {order.shippingMethod}</p>
                <p className="text-gray-600">Estimated Delivery: {formatDate(order.estimatedDelivery)}</p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <PackageIcon className="mr-2" size={20} /> Products
            </h2>
            <div className="space-y-4">
              {order.products.map((product) => (
                <div key={product._id} className="bg-gray-50 rounded-lg p-4 flex items-center">
                  <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-md mr-4" />
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800">{product.title}</h3>
                    <p className="text-gray-600">Quantity: {product.quantity}</p>
                    <p className="text-gray-600">Price: ₹{product.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">₹{(product.price * product.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <UserIcon className="mr-2" size={20} /> Customer Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600"><span className="font-medium">Name:</span> {user.fullName}</p>
                <p className="text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
              </div>
              <div>
                <p className="text-gray-600"><span className="font-medium">Account Status:</span> {user.status}</p>
                <p className="text-gray-600 "><span className="font-semibold">Funds Total Balance:</span> ₹{user.totalBalance.toLocaleString()}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
