import React from 'react';
import { motion } from 'framer-motion';

const banners = [
  { id: 1, title: 'Summer Sale', description: 'Up to 50% off on selected items', color: 'bg-yellow-100' },
  { id: 2, title: 'New Arrivals', description: 'Check out our latest collection', color: 'bg-blue-100' },
];

function PromotionalBanners() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Promotions</h2>
      {banners.map((banner) => (
        <div key={banner.id} className={`${banner.color} p-4 rounded-md mb-4 last:mb-0`}>
          <h3 className="font-bold text-lg">{banner.title}</h3>
          <p className="text-sm text-gray-600">{banner.description}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default PromotionalBanners;