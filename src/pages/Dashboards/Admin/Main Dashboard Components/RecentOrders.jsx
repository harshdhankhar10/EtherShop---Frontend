import React from 'react';
import { motion } from 'framer-motion';
import { FiPackage } from 'react-icons/fi';

const RecentOrders = () => {
  const orders = [
    { id: '12345', customer: 'John Doe', total: '$129.99', status: 'Completed' },
    { id: '12346', customer: 'Jane Smith', total: '$79.99', status: 'Pending' },
    { id: '12347', customer: 'Bob Johnson', total: '$199.99', status: 'Shipped' },
    { id: '12348', customer: 'Alice Brown', total: '$59.99', status: 'Processing' },
  ];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FiPackage className="mr-2" /> Recent Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-b last:border-b-0"
              >
                <td className="py-3">{order.id}</td>
                <td className="py-3">{order.customer}</td>
                <td className="py-3">{order.total}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'}`}>
                    {order.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentOrders;