import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { 
  FiHome, FiUser,FiLifeBuoy, FiShoppingBag, FiHeart, FiMessageSquare, 
  FiSettings, FiFile, FiGift, FiMessageCircle, FiLogOut, FiSun, 
  FiMoon, FiBell 
} from 'react-icons/fi';
import { SiChatbot } from 'react-icons/si';
import { TbCategoryPlus } from 'react-icons/tb';
import { Helmet } from 'react-helmet';
import { GrProductHunt } from 'react-icons/gr';

const MenuItem = ({ icon, title, link = '#', submenu, notifications = 0, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSubmenu = (e) => {
    if (submenu) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <li className={`mb-2 group ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      <Link 
        to={link}
        onClick={toggleSubmenu}
        className={`flex items-center p-3 rounded-xl transition-all duration-300 ease-out
          ${darkMode 
            ? 'hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-900 hover:text-white' 
            : 'hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-200 hover:text-indigo-800'}`}
      >
        <span className={`mr-3 text-xl group-hover:scale-110 transition-transform duration-300 
          ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{icon}</span>
        <span className="flex-grow font-medium">{title}</span>
        {notifications > 0 && (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full mr-2 
            ${darkMode ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white'}`}>
            {notifications}
          </span>
        )}
        {submenu && (
          <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </Link>

      {submenu && (
        <ul className={`ml-4 mt-2 space-y-1 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {Object.entries(submenu).map(([key, value]) => (
            <li key={key} className={`hover:text-${darkMode ? 'indigo-300' : 'indigo-700'} transition-colors duration-300`}>
              {typeof value === 'string' ? (
                <Link 
                  to={value}
                  className={`block py-2 px-4 text-sm rounded-md transition-colors duration-300
                    ${darkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-indigo-900' 
                      : 'text-gray-600 hover:text-indigo-800 hover:bg-indigo-100'}`}
                >
                  {key}
                </Link>
              ) : (
                <MenuItem title={key} link="#" submenu={value} darkMode={darkMode} />
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const auth = JSON.parse(localStorage.getItem('auth'));

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) setDarkMode(JSON.parse(savedMode));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <div className="flex">
      <Helmet>
        <title>EtherShop - Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for EtherShop" />
      </Helmet>
      <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-80'} h-screen overflow-hidden`}>
        <div className={`h-full transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl flex flex-col`}>
          <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <h1 className={`text-3xl font-extrabold ${darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-pulse' : 'text-indigo-700'} tracking-wide`}>
                EtherShop
              </h1>
            )}
            <button onClick={() => setIsCollapsed(!isCollapsed)} className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-indigo-700'} transition-colors duration-300`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
              </svg>
            </button>
          </div>

          {!isCollapsed && (
            <div className={`px-6 py-4 mb-6 flex items-center space-x-4 ${darkMode ? 'bg-gray-800' : 'bg-indigo-50'} rounded-lg mx-4`}>
              <img src="https://i.pravatar.cc/100" alt="User" className="w-12 h-12 rounded-full border-2 border-indigo-500" />
              <div>
                <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-indigo-800'}`}>{auth.user.fullName}</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{auth.user.email}</p>
              </div>
            </div>
          )}

          <div className="flex-grow overflow-y-auto px-4 scrollbar-none">
            {!isCollapsed && (
              <ul className="space-y-2">
                <MenuItem 
                  icon={<FiHome />} 
                  title="Dashboard" 
                  link="/dashboard" 
                  submenu={{
                    Overview: { Summary: "/dashboard/summary", "Recent Activity": "/dashboard/recent-activity", Notifications: "/dashboard/notifications" }
                  }} 
                  darkMode={darkMode} 
                />
                <MenuItem 
                  icon={<GrProductHunt />} 
                  title="Products" 
                  link="/products" 
                  submenu={{ "Create Product": "/dashboard/admin/product/create", "Manage Product": "/dashboard/admin/product/manage" }}
                  darkMode={darkMode} 
                />
                <MenuItem 
                  icon={<FiShoppingBag />} 
                  title="Orders" 
                  link="/orders" 
                  submenu={{ 
                    "All Orders": "/orders/all",
                    "Apply For Refund": "/orders/apply-for-refund",
                    "Refund Requests": "/orders/refunds",
                    "Order Details": "/orders/details",
                    "Invoice Download": "/orders/invoice",
                    "Digital Downloads": "/orders/digital",
                    "Order Support": "/orders/support",
                    "Order History": "/orders/history"
                  }} 
                  notifications={3} 
                  darkMode={darkMode} 
                />
                <MenuItem 
                  icon={<TbCategoryPlus />} 
                  title="Categories" 
                  link="/categories" 
                  submenu={{ "Create New Category": "/dashboard/admin/categories/create", "Manage Categories": "/dashboard/admin/categories/all" }} 
                  darkMode={darkMode} 
                />
                <MenuItem 
                  icon={<FiMessageSquare />} 
                  title="ContactUs Data" 
                  link="/contact-us-data" 
                  submenu={{ "All Data": "/dashboard/admin/contact-us-data" }} 
                  notifications={5} 
                  darkMode={darkMode} 
                />
                <MenuItem 
                  icon={<FiLifeBuoy />} 
                  title="Support" 
                  link="/support" 
                  submenu={{ 
                    "Help Center": "/support/help", 
                    "Contact Support": { "Live Chat": "/support/chat", "Email Support": "/support/email", "Call Support": "/support/call" }, 
                    FAQ: "/support/faq" 
                  }} 
                  darkMode={darkMode} 
                />
                <MenuItem 
                  icon={<FiSettings />} 
                  title="Settings" 
                  link="/settings" 
                  submenu={{ "Notification Settings": "/settings/notifications", "Privacy Settings": "/settings/privacy", "Language & Region": "/settings/language" }} 
                  darkMode={darkMode} 
                />
                <MenuItem 
                  icon={<FiGift />} 
                  title="Loyalty & Rewards" 
                  link="/rewards" 
                  submenu={{ "View Points": "/rewards/points", "Redeem Points": "/rewards/redeem", "Special Offers": "/rewards/offers" }} 
                  notifications={1} 
                  darkMode={darkMode} 
                />
                <MenuItem 
                  icon={<FiMessageCircle />} 
                  title="Feedback" 
                  link="/feedback" 
                  submenu={{ "Submit Feedback": "/feedback/submit", "View Submitted Feedback": "/feedback/view" }} 
                  darkMode={darkMode} 
                />
                <MenuItem 
                  icon={<SiChatbot />} 
                  title="AI Chatbot" 
                  link="/dashboard" 
                  darkMode={darkMode} 
                />
                <MenuItem 
                  icon={<FiLogOut />} 
                  title="Logout" 
                  link="/logout" 
                  darkMode={darkMode} 
                />
              </ul>
            )}
          </div>

          <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <>
                <button onClick={toggleDarkMode} className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-indigo-100 text-indigo-600'} transition-colors duration-300`}>
                  {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-grow bg-gray-100 dark:bg-gray-800 transition-colors duration-300 h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
