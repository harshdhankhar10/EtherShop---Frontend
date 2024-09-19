import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusBreakdown = () => {
  const [chartData, setChartData] = useState({
    labels: ['Pending', 'Completed', 'Cancelled'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#FFCE56', '#36A2EB', '#FF6384'],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/orders-analytics`);
        const { data } = response;
        setChartData({
          labels: ['Delivered', 'Processing', 'Cancelled', 'Returned'],
          datasets: [
            {
              data: [
                data.totalDelivered || 0,
                data.totalProcessing || 0,
                data.totalCancelled || 0,
                data.totalReturned || 0,
              ],
              backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#9E9E9E'],
              hoverBackgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#9E9E9E'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching order analytics:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Order Status Breakdown',
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 max-h-[400px] overflow-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4">Order Status Breakdown</h2>
      <Pie data={chartData} options={options} />
    </motion.div>
  );
};

export default OrderStatusBreakdown;
