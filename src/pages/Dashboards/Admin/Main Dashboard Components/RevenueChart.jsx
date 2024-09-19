import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FiShoppingCart, FiUsers, FiBox, FiTag } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsChart = ({ analytics }) => {
  const data = {
    labels: ['Total Orders', 'Total Users', 'Total Products', 'Total Categories', 'Total Revenue'],
    datasets: [
      {
        label: 'Analytics Overview',
        data: [
          analytics.totalOrders || 0,
          analytics.totalUsers || 0,
          analytics.totalProducts || 0,
          analytics.totalCategories || 0,
          analytics.totalRevenue.length > 0 ? analytics.totalRevenue[0].total : 0,
        ],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Analytics Overview: Orders, Users, Products, Categories, Revenue',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Line data={data} options={options} />
    </motion.div>
  );
};

const AnalyticsOverview = ({ totalOrders, totalUsers, totalProducts, totalCategories }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
        <FiShoppingCart className="text-4xl text-blue-500" />
        <div>
          <p className="text-lg font-semibold">Total Orders</p>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
        <FiUsers className="text-4xl text-green-500" />
        <div>
          <p className="text-lg font-semibold">Total Users</p>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
        <FiBox className="text-4xl text-yellow-500" />
        <div>
          <p className="text-lg font-semibold">Total Products</p>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
        <FiTag className="text-4xl text-red-500" />
        <div>
          <p className="text-lg font-semibold">Total Categories</p>
          <p className="text-2xl font-bold">{totalCategories}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/total-analytics`
        );
        setAnalyticsData(response.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };
    fetchAnalyticsData();
  }, []);

  if (!analyticsData) {
    return <p>Loading analytics...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 ">
      <AnalyticsChart analytics={analyticsData} />
    </div>
  );
};

export default Dashboard;
