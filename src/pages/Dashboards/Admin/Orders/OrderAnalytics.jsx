import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Package, XCircle, RefreshCcw, TruckIcon, IndianRupee } from 'lucide-react';

const OrderAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderAnalytics = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/orders-analytics`);
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching order analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!analytics) {
    return <div className="text-center text-red-500">Failed to load analytics data.</div>;
  }

  const chartData = [
    { name: 'Placed', value: analytics.totalOrders },
    { name: 'Delivered', value: analytics.totalDelivered },
    { name: 'Cancelled', value: analytics.totalCancelled },
    { name: 'Processing', value: analytics.totalProcessing },
    { name: 'Returned', value: analytics.totalReturned },
  ];

  const StatCard = ({ title, value, icon: Icon, trend }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="p-4">
        <div className="flex items-center justify-between pb-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <Icon className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">{value}</p>
        
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Order Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Orders" value={analytics.totalOrders} icon={Package} />
        <StatCard title="Total Revenue" value={`₹${analytics.totalRevenue.toLocaleString()}`} icon={IndianRupee} />
        <StatCard title="Delivered Orders" value={analytics.totalDelivered} icon={TruckIcon} />
        <StatCard title="Cancelled Orders" value={analytics.totalCancelled} icon={XCircle}  />
        <StatCard title="Processing Orders" value={analytics.totalProcessing} icon={RefreshCcw} />
        <StatCard title="Returned Orders" value={analytics.totalReturned} icon={ArrowDownRight} />
        
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Status Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" animationDuration={1500} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default OrderAnalytics;