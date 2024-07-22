import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiShoppingBag, FiShoppingCart, FiHeart, FiPackage, 
  FiUser, FiHelpCircle, FiBell, FiSettings, FiLogOut,
  FiChevronDown, FiChevronRight, FiMenu
} from 'react-icons/fi';
import { HiOutlineTicket } from "react-icons/hi2";

import { FaRupeeSign } from "react-icons/fa";
import {Helmet} from 'react-helmet';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';


const MenuItem = ({ item, isOpen, activeMenu, setActiveMenu }) => {
  const location = useLocation();
  const navigate = useNavigate()
  const isActive = location.pathname.startsWith(item.link);

  const menuItemVariants = {
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    closed: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const chevronVariants = {
    open: { rotate: 180, transition: { duration: 0.3 } },
    closed: { rotate: 0, transition: { duration: 0.3 } }
  };

  const submenuVariants = {
    open: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24,
        staggerChildren: 0.07,
        delayChildren: 0.2
      } 
    },
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24,
        staggerChildren: 0.05,
        staggerDirection: -1
      } 
    }
  };

  const submenuItemVariants = {
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    closed: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <div className="mb-2">
    <Helmet>
      <title>Welcome to Your Dashboard</title>
    </Helmet>
      <motion.button
        onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
        className={`flex items-center w-full p-2 rounded-lg transition-colors ${
          isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200 text-gray-700'
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <item.icon className={`w-5 h-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
        <AnimatePresence>
          {isOpen && (
            <motion.span
              className="flex-grow text-left"
              variants={menuItemVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {item.title}
            </motion.span>
          )}
        </AnimatePresence>
        {isOpen && item.submenus.length > 0 && (
          <motion.div
            variants={chevronVariants}
            initial="closed"
            animate={activeMenu === item.title ? "open" : "closed"}
          >
            <FiChevronDown />
          </motion.div>
        )}
      </motion.button>
      <AnimatePresence>
        {isOpen && activeMenu === item.title && item.submenus.length > 0 && (
          <motion.div
            variants={submenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="ml-6 mt-2 space-y-2 overflow-hidden"
          >
            {item.submenus.map((submenu, subIndex) => (
              <motion.div key={subIndex} variants={submenuItemVariants}>
                <Link
                  to={submenu.link}
                  className={`block p-2 rounded-lg transition-colors ${
                    location.pathname === submenu.link
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {submenu.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate()

  const toggleSidebar = () => setIsOpen(!isOpen);
  const [auth, setAuth] = useAuth()
  const userLogout = () => {
    setAuth({
      ...auth, user : null, toke : ""
    })
    navigate('/login')
    localStorage.removeItem('auth')
    toast.success('Logged Out Successfully')
    

  }
  const sidebarVariants = {
    open: { 
      width: '16rem',
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { 
      width: '5rem',
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const menuItems = [
    {
      icon: FiHome,
      title: 'Dashboard',
      link: '/dashboard',
      submenus: [
        { title: 'Overview', link: '/dashboard/overview' },
        { title: 'Recent Orders', link: '/dashboard/recent-orders' },
        { title: 'Recommendations', link: '/dashboard/recommendations' }
      ]
    },
    {
      icon: FiShoppingBag,
      title: 'Orders',
      link: '/orders',
      submenus: [
        { title: 'My Orders', link: '/orders/my-orders' },
        { title: 'Track Order', link: '/orders/track' },
        { title: 'Order History', link: '/orders/history' }
      ]
    },
    {
      icon: FiShoppingCart,
      title: 'Cart',
      link: '/cart',
      submenus: [
        { title: 'View Cart', link: '/cart/view' },
        { title: 'Checkout', link: '/cart/checkout' }
      ]
    },
    {
      icon: FiHeart,
      title: 'Wishlist',
      link: '/wishlist',
      submenus: [
        { title: 'My Wishlist', link: '/wishlist' }
      ]
    },
    {
      icon: FiPackage,
      title: 'Products',
      link: '/products',
      submenus: [
        { title: 'Browse Products', link: '/products/browse' },
        { title: 'Categories', link: '/products/categories' },
        { title: 'New Arrivals', link: '/products/new-arrivals' },
        { title: 'Best Sellers', link: '/products/best-sellers' }
      ]
    },
    {
      icon: FiUser,
      title: 'My Account',
      link: '/account',
      submenus: [
        { title: 'Profile', link: '/account/profile' },
        { title: 'Addresses', link: '/account/addresses' },
        { title: 'Payment Methods', link: '/account/payment-methods' },
        { title: 'Change Password', link: '/account/change-password' }
      ]
    },
    {
      icon: FaRupeeSign,
      title: 'Add Funds',
      link: '/add-funds',
      submenus: [
        { title: 'Deposit Funds', link: '/add-funds/deposit' },
        { title: 'View Balance', link: '/add-funds/balance' },
        { title: 'Manage Payment Methods', link: '/add-funds/payment-methods' },
        { title: 'Transaction History', link: '/add-funds/transaction-history' },
        { title: 'Account Funding Options', link: '/add-funds/funding-options' }
      ]
    },
    {
      icon : HiOutlineTicket,
      title : "Support Ticket",
      link : "/support",
      submenus : [
        { title: 'Support Tickets', link: '/dashboard/user/home/customer-support/my-tickets' },
        { title: 'Create Support Ticket', link: '/dashboard/user/home/customer-support/create-ticket' }
      ]
    },
    {
      icon: FiHelpCircle,
      title: 'Customer Support',
      link: '/support',
      submenus: [
        { title: 'FAQs', link: '/dashboard/user/home/customer-support/faq' },
        { title: 'Contact Support', link: '/dashboard/user/home/customer-support/contact' }
      ]
    },
   
    {
      icon: FiBell,
      title: 'Notifications',
      link: '/notifications',
      submenus: [
        { title: 'All Notifications', link: '/notifications/all' },
        { title: 'Unread Notifications', link: '/notifications/unread' }
      ]
    },
    {
      icon: FiSettings,
      title: 'Settings',
      link: '/settings',
      submenus: [
        { title: 'Account Settings', link: '/settings/account' },
        { title: 'Privacy Settings', link: '/settings/privacy' }
      ]
    },
       
  ];
  


  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <motion.div
        className="fixed top-0 left-0 h-full bg-white bg-opacity-90 backdrop-blur-lg shadow-xl z-50"
        variants={sidebarVariants}
        initial="open"
        animate={isOpen ? "open" : "closed"}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                className="text-xl font-bold text-gray-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                Dashboard
              </motion.h1>
            )}
          </AnimatePresence>
          <motion.button
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <FiChevronRight /> : <FiMenu />}
          </motion.button>
        </div>

        <nav className="mt-6 p-4 overflow-y-auto h-[calc(100vh-64px)]">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              isOpen={isOpen}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          ))}
          <button  className='flex items-center gap-3 w-full p-2 rounded-lg transition-colors hover:bg-gray-200 text-gray-700' onClick={() => {
            userLogout()
        }}>
           <FiLogOut className='w-5 h-5'/> 
           Logout
        </button>
        </nav>
        
      </motion.div>
      
      <motion.div
        className="flex-grow p-8 overflow-y-auto"
        initial={false}
        animate={{
          marginLeft: isOpen ? '16rem' : '5rem',
          transition: { type: "spring", stiffness: 300, damping: 24 }
        }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Sidebar;