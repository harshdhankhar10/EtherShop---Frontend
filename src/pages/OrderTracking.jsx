import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, AlertCircle, Clock, MapPin } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/track-order`, {
        params: { orderId }
      });
      setOrderStatus(response.data.order);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch order details. Please try again.',
      });
    }
  };

  const getStatusStep = (status) => {
    const steps = ['Not processed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    return steps.indexOf(status) + 1;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Not processed': return 'bg-gray-500';
      case 'Processing': return 'bg-blue-500';
      case 'Shipped': return 'bg-yellow-500';
      case 'Out for Delivery': return 'bg-orange-500';
      case 'Delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Helmet>
        <title>Order Tracking - EtherShop</title>
        <meta
          name="description"
          content="Track your order status using the order ID"
        />
      </Helmet>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900">Track Your Order</h2>
            <p className="mt-2 text-lg text-gray-600">Get real-time updates on your package</p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="orderId" className="sr-only">Order ID</label>
                <div className="relative">
                  <input
                    id="orderId"
                    name="orderId"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                  <Search className="absolute right-3 top-3 text-gray-400" size={24} />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Tracking Order...
                  </span>
                ) : (
                  'Track Order'
                )}
              </button>
            </div>
          </form>

          {orderStatus && (
            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Order Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Details and current status of your order.</p>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderStatus.payment.orderId}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Order Date</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(orderStatus.createdAt).toLocaleString()}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{(orderStatus.payment.amount / 100).toFixed(2)} {orderStatus.payment.currency}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Payment Status</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${orderStatus.payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {orderStatus.payment.status}
                      </span>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {orderStatus.shippingAddress.address}, {orderStatus.shippingAddress.city}, {orderStatus.shippingAddress.postalCode}, {orderStatus.shippingAddress.country}
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Order Status</h3>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    {['Not processed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].map((step, index) => (
                      <div key={step} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusStep(orderStatus.status) > index ? getStatusColor(orderStatus.status) : 'bg-gray-200'}`}>
                          {index === 0 && <Package className="text-white" size={20} />}
                          {index === 1 && <Clock className="text-white" size={20} />}
                          {index === 2 && <Truck className="text-white" size={20} />}
                          {index === 3 && <MapPin className="text-white" size={20} />}
                          {index === 4 && <CheckCircle className="text-white" size={20} />}
                        </div>
                        <p className="text-xs mt-2 text-center">{step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(orderStatus.status)} text-white`}>
                      Current Status: {orderStatus.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Order Items</h3>
                <div className="mt-6 border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {orderStatus.products.map((product, index) => (
                      <li key={index} className="py-4 flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover mr-4" src={product.image || 'https://via.placeholder.com/40'} alt={product.title} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
                          <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900"> ₹ {(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {orderStatus.orderStatusUpdates && orderStatus.orderStatusUpdates.length > 0 && (
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Status Updates</h3>
                  <div className="mt-6 flow-root">
                    <ul className="-mb-8">
                      {orderStatus.orderStatusUpdates.map((update, index) => (
                        <li key={index}>
                          <div className="relative pb-8">
                            {index !== orderStatus.orderStatusUpdates.length - 1 ? (
                              <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div>
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getStatusColor(update.status)}`}>
                                  <CheckCircle className="h-5 w-5 text-white" aria-hidden="true" />
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p className="text-sm text-gray-500">{update.status} <br></br> <span className="font-medium text-gray-900">{update.description}</span></p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                {update.time > 12 ? update.time - 12 + " AM" : update.time + " PM"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderTracking;