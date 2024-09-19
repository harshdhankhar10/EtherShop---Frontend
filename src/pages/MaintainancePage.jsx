import React from 'react';
import { FaClock, FaEnvelope, FaExclamationTriangle, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
const MaintenancePage = () => {
  return (
<>
<Helmet>
        <title>Under Maintenance | EtherShop</title>
</Helmet>
<div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <FaExclamationTriangle className="text-yellow-500 text-4xl mr-4" />
            <h1 className="text-3xl font-bold text-gray-800">We'll be back soon!</h1>
          </div>
          <p className="text-gray-600 text-center mb-8">
            We're currently performing some maintenance on our site to improve your shopping experience.
            We apologize for any inconvenience and appreciate your patience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="flex items-center">
              <FaClock className="text-blue-500 text-xl mr-2" />
              <span className="text-gray-700">Estimated downtime: 2 hours</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-blue-500 text-xl mr-2" />
              <a href="mailto:support@example.com" className="text-blue-500 hover:underline">
                support@ethershop.com
              </a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              Stay updated on our progress:
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4">
          <p className="text-sm text-gray-600 text-center">
            &copy; 2024 EtherShop. All rights reserved.
          </p>
        </div>
      </div>
    </div>
</>
  );
};

export default MaintenancePage;