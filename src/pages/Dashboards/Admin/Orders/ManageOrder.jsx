import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2, CheckCircle, XCircle, TruckIcon, PackageIcon, RefreshCcw, AlertTriangle } from 'lucide-react';

const ManageOrder = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const { id } = useParams();

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/order-details/${id}`);
      if (response.data.success) {
        setOrderDetails(response.data.order);
      } else {
        toast.error('Error fetching order details');
      }
    } catch (error) {
      console.error('Error fetching order details', error);
      toast.error('Failed to fetch order details');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/update-order-status/${id}`, {
        orderId: id,
        status,
        description,
        time,
        address,
      });
      if (data.success) {
        const newUpdate = {
          status,
          description,
          time,
          address,
        };
        setOrderDetails(prevDetails => ({
          ...prevDetails,
          orderStatusUpdates: [...(prevDetails?.orderStatusUpdates || []), newUpdate],
        }));
        setStatus('');
        setDescription('');
        setTime('');
        setAddress('');
        toast.success('Order status updated successfully');
      } else {
        toast.error('Error updating order status');
      }
    } catch (error) {
      console.error('Error updating order status', error);
      toast.error('Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <RefreshCcw className="w-5 h-5 text-blue-500" />;
      case 'Shipped':
        return <TruckIcon className="w-5 h-5 text-yellow-500" />;
      case 'Out for Delivery':
        return <TruckIcon className="w-5 h-5 text-orange-500" />;
      case 'Delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'Returned':
        return <RefreshCcw className="w-5 h-5 text-purple-500" />;
      default:
        return <PackageIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Manage Order Status</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Details</h2>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <p className="text-sm font-medium text-gray-600">Order ID: <span className="text-gray-800">{orderDetails?.payment?.orderId}</span></p>
            <p className="text-sm font-medium text-gray-600 mt-2">Current Status: <span className="text-gray-800">{orderDetails?.orderStatusUpdates?.[orderDetails.orderStatusUpdates.length - 1]?.status || 'N/A'}</span></p>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-gray-700">Update Status</h2>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                New Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Status</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Returned">Returned</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                Time
              </label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)} required
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)} required
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter address of update"
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className={`${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                } text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out`}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Update Status'
                )}
              </button>
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Status Timeline</h2>
          {!orderDetails?.orderStatusUpdates || orderDetails.orderStatusUpdates.length === 0 ? (
            <p className="text-gray-600">No updates available.</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6">
              {orderDetails.orderStatusUpdates.map((update, index) => (
                <div key={index} className={`flex items-start mb-4 ${index !== orderDetails.orderStatusUpdates.length - 1 ? 'pb-4 border-b border-gray-200' : ''}`}>
                  <div className="mr-4">
                    {getStatusIcon(update.status)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{update.status}</p>
                    <p className="text-sm text-gray-600">{update.description || 'No Description'}</p>
                    <p className="text-xs text-gray-500">{update.time || 'No Time'} - {update.address || 'No Address'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;