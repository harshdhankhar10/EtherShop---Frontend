import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full   max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full  md:w-1/2 p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-6xl font-bold text-blue-600">404</h1>
              <h2 className="mt-4 text-3xl font-semibold text-gray-800">Oops! Page not found</h2>
              <p className="mt-4 text-gray-600">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-8"
            >
              <Link 
                to="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Go back home
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold text-gray-800">Subscribe to our newsletter</h3>
              <p className="mt-2 text-gray-600">Stay updated with our latest offers and products.</p>
              <div className="mt-4 flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 transition duration-300">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 bg-blue-600 p-8 md:p-12 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <svg className="w-full max-w-sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9999 3L14.9999 7C14.9999 7.55228 15.4476 8 15.9999 8H19.9999" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 13V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                  d="M9 12L11 14L15 10"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;