import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, name: 'Order Placed', completed: true },
  { id: 2, name: 'Processing', completed: true },
  { id: 3, name: 'Shipped', completed: false },
  { id: 4, name: 'Delivered', completed: false },
];

function OrderTracking() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>
      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step.completed ? '✓' : step.id}
            </div>
            <div className="ml-4">
              <p className={`font-medium ${step.completed ? 'text-green-500' : 'text-gray-600'}`}>
                {step.name}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`absolute left-4 w-0.5 h-8 ${
                step.completed ? 'bg-green-500' : 'bg-gray-200'
              }`} style={{ top: `${(index + 1) * 3}rem` }}></div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default OrderTracking;