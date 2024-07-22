import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiMail, FiSettings, FiDownload, FiHeart, FiLogOut, FiHelpCircle, 
  FiBell, FiClock, FiShoppingCart, FiBarChart, FiCreditCard, FiArrowRight,
  FiGift, FiBookOpen, FiStar, FiTag, FiTrendingUp, FiPackage, FiRefreshCw,
  FiDollarSign, FiCheckCircle, FiAlertCircle, FiLock
} from 'react-icons/fi';
import Navbar from '../../../components/Navbar';
import { Helmet } from 'react-helmet';
import {useNavigate} from 'react-router-dom';

const WelcomeAfterLoginPage = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('auth')));
  const navigate = useNavigate();
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profileImage: 'https://images.media.io/images2023/ai-portrait-generator/portrait-pic1.png',
    lastLogin: '2023-06-10 15:30',
    rewardsPoints: 500,
    unreadMessages: 3,
    accountType: 'Premium',
    totalPurchases: 27,
    totalSpent: 789.99,
    
  };

  const recentPurchases = [
    { id: 1, name: 'Premium eBook Bundle', date: '2023-06-12', status: 'Ready for download' },
    { id: 2, name: 'Web Development Course', date: '2023-06-05', status: 'In progress' },
    { id: 3, name: 'UI/UX Design Templates', date: '2023-05-28', status: 'Completed' },
  ];

  const recommendedProducts = [
    { id: 1, name: 'Advanced JavaScript Guide', price: 29.99, discount: 20 },
    { id: 2, name: 'UI/UX Design Masterclass', price: 49.99, discount: 0 },
    { id: 3, name: 'Python for Data Science', price: 39.99, discount: 15 },
    { id: 4, name: 'Mobile App Development Kit', price: 59.99, discount: 10 },
  ];

  const featuredCategories = [
    { id: 1, name: 'eBooks', icon: FiBookOpen },
    { id: 2, name: 'Courses', icon: FiBookOpen },
    { id: 3, name: 'Templates', icon: FiPackage },
    { id: 4, name: 'Software', icon: FiDownload },
  ];

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <>
        <Helmet>
            <title>Welcome Dashboard  - EtherShop</title>
        </Helmet>
       
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome back, {user.name}!</h1>
              <p className="text-indigo-200">Your gateway to premium digital content</p>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold"
                onClick={() => {navigate('/dashboard/user/home')}}
              >
                Go to Dashboard
              </motion.button>
              <motion.img
                src={user.profileImage}
                alt={user.name}
                className="h-12 w-12 rounded-full border-2 border-white"
                whileHover={{ scale: 1.1 }}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-100 px-6 py-2 flex space-x-4">
            {['overview', 'purchases', 'recommendations', 'Account'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md ${
                  activeTab === tab ? 'bg-white text-indigo-600 shadow' : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Stats */}
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800">Total Purchases</h3>
                    <p className="text-3xl font-bold text-blue-600">{user.totalPurchases}</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800">Total Spent</h3>
                    <p className="text-3xl font-bold text-green-600">${user.totalSpent.toFixed(2)}</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800">Reward Points</h3>
                    <p className="text-3xl font-bold text-purple-600">{user.rewardsPoints}</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <h3 className="text-lg font- text-yellow-800">Account Type</h3>
                    <p className="text-3xl font-bold text-yellow-600">{user.accountType}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
                    onClick={() => {/* Navigate to downloads */}}
                  >
                    My Downloads <FiDownload className="ml-2" />
                  </motion.button>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md flex items-center justify-center"
                    onClick={() => {/* Navigate to wishlist */}}
                  >
                    My Wishlist <FiHeart className="ml-2" />
                  </motion.button>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full bg-purple-500 text-white py-2 px-4 rounded-md flex items-center justify-center"
                    onClick={() => setShowTutorial(true)}
                  >
                    Take a Tour <FiBookOpen className="ml-2" />
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === 'purchases' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Purchases</h2>
                <div className="space-y-4">
                  {recentPurchases.map((purchase) => (
                    <div key={purchase.id} className="bg-white p-4 rounded-md shadow flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">{purchase.name}</h3>
                        <p className="text-sm text-gray-500">{purchase.date}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          purchase.status === 'Ready for download' ? 'bg-green-100 text-green-800' :
                          purchase.status === 'In progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {purchase.status}
                        </span>
                        {purchase.status === 'Ready for download' && (
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="ml-4 text-indigo-600 hover:text-indigo-800"
                          >
                            <FiDownload size={20} />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recommended for You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendedProducts.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-md shadow">
                      <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                        {product.discount > 0 && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                            {product.discount}% OFF
                          </span>
                        )}
                      </div>
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
                      >
                        Add to Cart <FiShoppingCart className="ml-2" />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Account' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Account Information</h2>
                  <div className="bg-white p-4 rounded-md shadow">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Account Type:</strong> {user.accountType}</p>
                    <p><strong>Last Login:</strong> {user.lastLogin}</p>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md"
                    >
                      Edit Profile
                    </motion.button>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Account Actions</h2>
                  <div className="space-y-4">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center"
                    >
                      Change Password <FiLock className="ml-2" />
                    </motion.button>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-md flex items-center justify-center"
                    >
                      Manage Subscriptions <FiRefreshCw className="ml-2" />
                    </motion.button>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full bg-purple-500 text-white py-2 px-4 rounded-md flex items-center justify-center"
                    >
                      Billing Information <FiCreditCard className="ml-2" />
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Featured Categories */}
          <div className="bg-gray-100 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredCategories.map((category) => (
                <motion.button
                  key={category.id}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-white p-4 rounded-md shadow flex flex-col items-center"
                >
                  <category.icon className="text-indigo-600 text-3xl mb-2" />
                  <span className="font-medium text-gray-800">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
            <div className="text-sm">
              Need help? <a href="#" className="text-indigo-300 hover:underline">Contact Support</a>
            </div>
{/* Footer (continued) */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="text-indigo-300 hover:text-indigo-100"
              onClick={() => {/* Implement logout */}}
            >
              <FiLogOut className="inline-block mr-2" /> Logout
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">Welcome to Your Digital Marketplace!</h2>
              <p className="mb-4">Here's a quick tour of what you can do:</p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Browse and purchase digital products from various categories</li>
                <li>Access and download your purchased items anytime</li>
                <li>Track your orders and view purchase history</li>
                <li>Manage your account settings and subscriptions</li>
                <li>Earn and redeem reward points for discounts</li>
                <li>Explore personalized product recommendations</li>
                <li>Add items to your wishlist for future purchases</li>
                <li>Get support from our customer service team</li>
              </ul>
              <motion.button
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                onClick={() => setShowTutorial(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Got it, let's explore!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default WelcomeAfterLoginPage;