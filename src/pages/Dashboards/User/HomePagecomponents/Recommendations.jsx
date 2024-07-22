import React from 'react';
import { motion } from 'framer-motion';

const recommendations = [
  { id: 1, name: 'Product A', price: 49.99, image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Product B', price: 79.99, image: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Product C', price: 29.99, image: 'https://via.placeholder.com/100' },
];

function Recommendations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
      <div className="grid grid-cols-3 gap-4">
        {recommendations.map((product) => (
          <div key={product.id} className="text-center">
            <img src={product.image} alt={product.name} className="w-full rounded-md mb-2" />
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Recommendations;