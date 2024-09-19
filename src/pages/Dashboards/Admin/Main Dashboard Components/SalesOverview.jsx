import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiUsers, FiPackage, FiGrid } from 'react-icons/fi';
import { FaRupeeSign, FaChartLine } from "react-icons/fa6"; 
import axios from 'axios';

const SalesOverview = () => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalRevenue: [{ total: 0 }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/total-analytics/`
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      title: 'Total Sales',
      value: `₹${data.totalRevenue[0]?.total || 0}`,
      icon: FaRupeeSign,
      color: 'bg-blue-600', 
    },
    {
      title: 'Total Orders',
      value: data.totalOrders,
      icon: FiShoppingCart,
      color: 'bg-green-600', 
    },
    {
      title: 'Total Revenue',
      value: `₹${data.totalRevenue[0]?.total || 0}`,
      icon: FaChartLine,
      color: 'bg-purple-600', 
    },
    {
      title: 'Total Users',
      value: data.totalUsers,
      icon: FiUsers,
      color: 'bg-yellow-500', 
    },
    {
      title: 'Total Products',
      value: data.totalProducts,
      icon: FiPackage,
      color: 'bg-red-500', 
    },
    {
      title: 'Total Categories',
      value: data.totalCategories,
      icon: FiGrid,
      color: 'bg-indigo-500', 
    }
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
