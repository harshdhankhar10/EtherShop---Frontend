import React from 'react';
import { motion } from 'framer-motion';

const activities = [
  { id: 1, action: 'Placed an order', details: 'Order #1234', time: '2 hours ago' },
  { id: 2, action: 'Updated profile', details: 'Changed email address', time: '1 day ago' },
  { id: 3, action: 'Added funds', details: '$100 added to account', time: '3 days ago' },
];

function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className="mb-3 pb-3 border-b last:border-b-0">
            <p className="font-medium">{activity.action}</p>
            <p className="text-sm text-gray-600">{activity.details}</p>
            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default RecentActivity;