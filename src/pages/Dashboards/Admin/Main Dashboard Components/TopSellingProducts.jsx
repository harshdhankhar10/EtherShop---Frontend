import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const TopSellingProducts = () => {
  const products = [
    { name: 'Wireless Earbuds', sales: 1234, revenue: '$24,680' },
    { name: 'Smart Watch', sales: 987, revenue: '$39,480' },
    { name: 'Bluetooth Speaker', sales: 765, revenue: '$15,300' },
    { name: 'Fitness Tracker', sales: 543, revenue: '$10,860' },
  ];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FiStar className="mr-2" /> Top Selling Products
      </h2>
      <div className="space-y-4">
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between border-b pb-2 last:border-b-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.sales} sales</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">{product.revenue}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopSellingProducts;