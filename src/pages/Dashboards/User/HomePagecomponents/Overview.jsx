import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', purchases: 2, spent: 150, rewards: 15 },
  { month: 'Feb', purchases: 1, spent: 80, rewards: 8 },
  { month: 'Mar', purchases: 3, spent: 220, rewards: 22 },
  { month: 'Apr', purchases: 4, spent: 300, rewards: 30 },
  { month: 'May', purchases: 2, spent: 175, rewards: 17 },
  { month: 'Jun', purchases: 3, spent: 250, rewards: 25 },
];

function Overview() {
  const totalPurchases = data.reduce((sum, item) => sum + item.purchases, 0);
  const totalSpent = data.reduce((sum, item) => sum + item.spent, 0);
  const totalRewards = data.reduce((sum, item) => sum + item.rewards, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Your Activity Overview</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Total Purchases</p>
          <p className="text-2xl font-bold">{totalPurchases}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-sm text-green-600">Total Spent</p>
          <p className="text-2xl font-bold">${totalSpent}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <p className="text-sm text-purple-600">Reward Points</p>
          <p className="text-2xl font-bold">{totalRewards}</p>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="purchases" name="Purchases" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="spent" name="Amount Spent ($)" stroke="#82ca9d" />
            <Line yAxisId="left" type="monotone" dataKey="rewards" name="Reward Points" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default Overview;