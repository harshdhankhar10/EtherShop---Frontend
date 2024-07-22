import React from 'react';
import { motion } from 'framer-motion';

const notifications = [
  { id: 1, message: 'Your order #1234 has been shipped', time: '2 hours ago' },
  { id: 2, message: 'New product added to your wishlist', time: '1 day ago' },
  { id: 3, message: "Don't forget to complete your profile', time: '3 days ago" },
];

function Notifications() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="mb-3 pb-3 border-b last:border-b-0">
            <p className="text-sm">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default Notifications;