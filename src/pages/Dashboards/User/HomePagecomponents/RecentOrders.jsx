import React from 'react';
import { motion } from 'framer-motion';

const orders = [
  { id: 1, date: '2024-07-15', total: 125.99, status: 'Delivered' },
  { id: 2, date: '2024-07-18', total: 79.50, status: 'Shipped' },
  { id: 3, date: '2024-07-19', total: 249.99, status: 'Processing' },
];

function RecentOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="mb-2 p-2 bg-gray-50 rounded">
            <p className="font-medium">Order #{order.id}</p>
            <p className="text-sm text-gray-600">Date: {order.date}</p>
            <p className="text-sm text-gray-600">Total: ${order.total}</p>
            <span className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
              {order.status}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default RecentOrders;