import React from 'react';
import { motion } from 'framer-motion';

const links = [
  { name: 'Cart', icon: '🛒' },
  { name: 'Wishlist', icon: '❤️' },
  { name: 'Account Settings', icon: '⚙️' },
];

function QuickLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
      <div className="flex justify-around">
        {links.map((link) => (
          <button
            key={link.name}
            className="flex flex-col items-center p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl mb-1">{link.icon}</span>
            <span className="text-sm">{link.name}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default QuickLinks;