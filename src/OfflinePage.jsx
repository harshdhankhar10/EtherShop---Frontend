import React, { useState } from 'react';
import { FiWifiOff, FiRefreshCw } from 'react-icons/fi';

const OfflinePage = () => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    // Simulate a delay before reloading to show the spinner
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 transform hover:scale-105 transition-transform duration-300">
        <div className="text-center">
          <div className="relative inline-block">
            <FiWifiOff className="text-7xl text-red-500 mb-6 animate-pulse" />
            <div className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! You're Offline</h1>
          <p className="text-xl text-gray-600 mb-6">
            It seems your internet connection is not available at the moment.
          </p>
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-200 flex items-center justify-center w-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRetrying ? (
              <>
                <Spinner className="mr-2" />
                Retrying...
              </>
            ) : (
              <>
                <FiRefreshCw className="mr-2" /> Retry Connection
              </>
            )}
          </button>
          <div className="text-left mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2 text-gray-700">Try these steps:</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Check your WiFi or cellular data connection</li>
              <li>Restart your router or modem</li>
              <li>Move to an area with better signal strength</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Spinner component
const Spinner = ({ className }) => (
  <svg className={`animate-spin h-5 w-5 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default OfflinePage;