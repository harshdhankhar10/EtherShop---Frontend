import React from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiShoppingCart, FiTrendingUp } from 'react-icons/fi';

const SalesOverview = () => {
  const stats = [
    { title: 'Total Sales', value: '$124,563', icon: FiDollarSign, color: 'bg-blue-500' },
    { title: 'Total Orders', value: '1,234', icon: FiShoppingCart, color: 'bg-green-500' },
    { title: 'Revenue', value: '$98,765', icon: FiTrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={`${stat.color} rounded-xl shadow-lg p-6 text-white`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-75">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
            </div>
            {React.createElement(stat.icon, { className: 'text-4xl opacity-75' })}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SalesOverview;
