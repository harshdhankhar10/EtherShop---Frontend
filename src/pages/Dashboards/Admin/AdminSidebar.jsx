import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiUser, FiLifeBuoy, FiShoppingBag, FiHeart, FiMessageSquare, 
  FiSettings, FiFile, FiGift, FiMessageCircle, FiLogOut, FiSun, 
  FiMoon, FiBell, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { RiCoupon2Line } from "react-icons/ri";
import { SiChatbot } from 'react-icons/si';
import { TbCategoryPlus } from 'react-icons/tb';
import { GrProductHunt } from 'react-icons/gr';
import { motion, AnimatePresence } from 'framer-motion';
import {Helmet} from "react-helmet";

const MenuItem = ({ icon, title, link = '#', submenu, notifications = 0, darkMode, isCollapsed, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSubmenu = (e) => {
    if (submenu) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <li className="mb-2 group">
      <Helmet>
        <title>Welcome to dashboard</title>
      </Helmet>
      <Link 
        to={link}
        onClick={toggleSubmenu}
        className={`flex items-center p-3 rounded-xl transition-all duration-300 ease-out
          ${isActive 
            ? (darkMode ? 'bg-indigo-900 text-white' : 'bg-indigo-100 text-indigo-800')
            : (darkMode ? 'text-gray-300 hover:bg-indigo-900/50' : 'text-gray-700 hover:bg-indigo-100/50')}`}
      >
        <span className={`mr-3 text-xl group-hover:scale-110 transition-transform duration-300 
          ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{icon}</span>
        {!isCollapsed && (
          <>
            <span className="flex-grow font-medium">{title}</span>
            {notifications > 0 && (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                ${darkMode ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white'}`}>
                {notifications}
              </span>
            )}
            {submenu && (
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </motion.svg>
            )}
          </>
        )}
      </Link>

      <AnimatePresence>
        {submenu && isOpen && !isCollapsed && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4 mt-2 space-y-1"
          >
            {Object.entries(submenu).map(([key, value]) => (
              <motion.li
                key={key}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`hover:text-${darkMode ? 'indigo-300' : 'indigo-700'} transition-colors duration-300`}
              >
                <Link 
                  to={value}
                  className={`block py-2 px-4 text-sm rounded-md transition-colors duration-300
                    ${darkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-indigo-900/50' 
                      : 'text-gray-600 hover:text-indigo-800 hover:bg-indigo-100/50'}`}
                >
                  {key}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
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

  const menuItems = [
    { icon: <FiHome />, title: "Dashboard", link: "/dashboard/admin"},
    { icon: <GrProductHunt />, title: "Products", link: "/products", submenu: { 
      "Create Product": "/dashboard/admin/product/create", "Manage Product": "/dashboard/admin/product/manage" 
    }},

    { icon: <FiShoppingBag />, title: "Orders", link: "/orders", submenu: { 
      "All Orders": "/dashboard/admin/orders/all",
      "Order Analytics": "/dashboard/admin/orders/analytics",
      // "Order Settings": "/dashboard/admin/orders/settings"
    }},
    { icon: <TbCategoryPlus />, title: "Categories", link: "/categories", submenu: { 
      "Create New Category": "/dashboard/admin/categories/create", "Manage Categories": "/dashboard/admin/categories/all" 
    }},
    { icon: <FiMessageSquare />, title: "ContactUs Data", link: "/contact-us-data", submenu: { 
      "All Data": "/dashboard/admin/contact-us-data" 
    }, notifications: 5 },
    { icon: <FiLifeBuoy />, title: "User Management", link: "/users/all", submenu: { 
      "All Users": "/dashboard/admin/users/all",
      "Create New User": "/dashboard/admin/users/create"
    }},
    { icon: <RiCoupon2Line />, title: "Coupons", link: "/coupons", submenu: { 
      "Create Coupons": "/dashboard/admin/coupons/create", "All Coupons": "/dashboard/admin/coupons/all" 
    }},
    { icon: <FiGift />, title: "Loyalty & Rewards", link: "/rewards", submenu: { 
      "View Points": "/rewards/points", "Redeem Points": "/rewards/redeem", "Special Offers": "/rewards/offers" 
    }, notifications: 1 },
    { icon: <FiMessageCircle />, title: "Feedback", link: "/feedback", submenu: { 
      "Submit Feedback": "/feedback/submit", "View Submitted Feedback": "/feedback/view" 
    }},
    {
      // Miscellaneous setting
      
      icon: <FiSettings />, title: "Settings", submenu: {
        "General Settings": "/dashboard/settings/general",
        "Security Settings": "/dashboard/settings/security",
        "Billing Settings": "/dashboard/settings/billing",
        "Subscription": "/dashboard/settings/subscription",
        "API Settings": "/dashboard/settings/api",
        "Webhooks": "/dashboard/settings/webhooks",
        "Integrations": "/dashboard/settings/integrations",
        "Maintainance": "/dashboard/admin/misc/maintainance",
      }
    },
    { icon: <SiChatbot />, title: "AI Chatbot", link: "/chatbot" },
    { icon: <FiLogOut />, title: "Logout", link: "/logout" }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <motion.div 
        initial={false}
        animate={{ width: isCollapsed ? '5rem' : '20rem' }}
        transition={{ duration: 0.3 }}
        className={`h-full ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl flex flex-col`}
      >
        <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`text-3xl font-extrabold ${darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500' : 'text-indigo-700'} tracking-wide`}
            >
              EtherShop
            </motion.h1>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-indigo-100 text-gray-600 hover:text-indigo-700'} transition-colors duration-300`}
          >
            {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>

        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`px-6 py-4 mb-6 flex items-center space-x-4 ${darkMode ? 'bg-gray-800' : 'bg-indigo-50'} rounded-lg mx-4`}
          >
            <img src="https://i.pravatar.cc/100" alt="User" className="w-12 h-12 rounded-full border-2 border-indigo-500" />
            <div>
              <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-indigo-800'}`}>{auth.user.fullName}</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{auth.user.email}</p>
            </div>
          </motion.div>
        )}

        {!isCollapsed && (
          <div className="px-6 mb-4">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-2 rounded-md ${
                darkMode 
                  ? 'bg-gray-800 text-white placeholder-gray-500' 
                  : 'bg-gray-100 text-gray-800 placeholder-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
          </div>
        )}

        <div className="flex-grow overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-300">
          <ul className="space-y-2">
            {filteredMenuItems.map((item, index) => (
              <MenuItem 
                key={index}
                {...item}
                darkMode={darkMode}
                isCollapsed={isCollapsed}
                isActive={location.pathname === item.link}
              />
            ))}
          </ul>
        </div>

        <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'} transition-colors duration-300`}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          {!isCollapsed && (
            <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-indigo-100 text-gray-600 hover:text-indigo-700'} transition-colors duration-300`}>
              <FiBell size={20} />
            </button>
          )}
        </div>
      </motion.div>

      <div className={`flex-grow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} transition-colors duration-300 overflow-y-auto`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;