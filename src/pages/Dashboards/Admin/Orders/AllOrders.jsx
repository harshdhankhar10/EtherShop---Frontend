import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/admin-all-orders/`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Order Date</th>
              <th className="py-3 px-4 text-center">Order Status</th>
              <th className="py-3 px-4 text-center">Payment Status</th>
              <th className="py-3 px-4 text-center">Payment Method</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-200">
                <td className="py-3 px-4">{order.payment.orderId}</td>
                <td className="py-3 px-4">{format(new Date(order.createdAt), 'MMM dd, yyyy')}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    order.status === 'Successful' ? 'bg-green-100 text-green-800' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    order.payment.status === 'Successful' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.payment.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">{order.payment.modeOfPayment}</td>
                <td className="py-3 px-4">₹{order.payment.amount.toLocaleString()}</td>
                <td className="py-3 px-4 text-center">
                  <Link to={`/dashboard/admin/orders/view-order/${order._id}`} className="text-blue-500 hover:text-blue-700 font-medium">
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
