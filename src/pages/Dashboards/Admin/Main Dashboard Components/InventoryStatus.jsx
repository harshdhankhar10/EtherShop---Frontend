import React from 'react';
import { motion } from 'framer-motion';
import { FiBox, FiAlertCircle } from 'react-icons/fi';

const InventoryStatus = () => {
  const inventoryItems = [
    { name: 'Wireless Earbuds', stock: 145, status: 'In Stock' },
    { name: 'Smart Watch', stock: 23, status: 'Low Stock' },
    { name: 'Bluetooth Speaker', stock: 0, status: 'Out of Stock' },
    { name: 'Fitness Tracker', stock: 78, status: 'In Stock' },
    { name: 'Blood Flow Tracker', stock: 128, status: 'In Stock' },
  ];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}                 
      animate={{ opacity: 1, y: 0 }}                   
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FiBox className="mr-2" /> Inventory Status
      </h2>
      <div className="space-y-4">
        {inventoryItems.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.stock} in stock</p>
            </div>
            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'}`}>
                {item.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default InventoryStatus;