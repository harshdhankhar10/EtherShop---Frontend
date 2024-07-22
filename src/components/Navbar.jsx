import React, { useState } from 'react';
import { CiLocationOn, CiSearch } from 'react-icons/ci';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { FaTruckFast } from 'react-icons/fa6';
import { BiSolidOffer } from 'react-icons/bi';
import { HiMiniBars3BottomLeft, HiBars3 } from 'react-icons/hi2';
import { RiContactsFill } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { SiWish } from "react-icons/si";

function Navbar() {
  const [showBanner, setShowBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth()

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const handleLogout  = ()=>{
    setAuth({
      ...auth, user : null, toke : ""
    })
    localStorage.removeItem('auth')
    toast.success('Logged Out Successfully')

  }

  return (
    <nav className="bg-white shadow-lg">
      {/* Banner */}
      {showBanner && (
        <div className="bg-blue-600 text-white py-2 px-4 md:px-6 flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            <span className="font-semibold text-sm md:text-base">Limited Time Offer: Get 50% OFF on All Products!</span>
            <Link to="/offer" className="bg-white text-blue-600 rounded-md px-3 py-1 text-sm font-semibold hover:bg-blue-50 transition-colors">
              Learn More
            </Link>
          </div>
          <FaTimes className="cursor-pointer" onClick={() => setShowBanner(false)} />
        </div>
      )}

      {/* Upper Section */}
      <div className="bg-gray-100 hidden md:flex justify-between items-center px-6 py-2">
        <span className="text-gray-600 text-sm font-semibold">Welcome to Ecommerce MARKETPLACE!</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CiLocationOn color="#1493C8" size="1.2em" />
            <span className="text-gray-600 text-sm font-semibold">
              Address <span className="font-bold">INDIA</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaTruckFast color="#1493C8" size="1.2em" />
            <Link to="/contact" className="text-gray-600 text-sm font-semibold hover:text-blue-600 transition-colors">
              Contact Us
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <BiSolidOffer color="#1493C8" size="1.2em" />
            <span className="text-gray-600 text-sm font-semibold">All Offers</span>
          </div>
          

         <Link to="/wishlist">
         <div className="flex items-center gap-2">
            <SiWish color="#1493C8" size="1.2em" />
            <span className="text-gray-600 text-sm font-semibold">My Wishlist</span>
          </div>
         </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex flex-wrap justify-between items-center px-4 md:px-6 py-3">
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            <HiMiniBars3BottomLeft className="bg-blue-50 rounded-full p-2" size="2.3em" color="#1493C8" />
          </button>
          <Link to="/" className="text-2xl md:text-3xl font-bold text-blue-600 flex items-center gap-1"> <LocalMallIcon style={{fontSize : "1.4em"}}/>Ecommerce</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block flex-grow max-w-2xl mx-4">
          <div className="relative">
            <CiSearch size="1.5em" color="#1493C8" className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search Online courses, AI, Blockchain, IoT, etc"
              className="w-full pl-10 pr-12 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
            />
            <HiBars3 size="1.5em" color="#1493C8" className="absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Account and Cart */}
        <div className="flex items-center gap-4">
        {!auth.user ? (
  <div className="relative group">
    <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg transition-all duration-300">
      <RiContactsFill size="1.3em" />
      <span className="font-medium">Sign In</span>
    </Link>
    <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-1/2 group-hover:transition-all duration-300"></span>
    <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-1/2 group-hover:transition-all duration-300"></span>
  </div>
) : (
  <div className="hidden md:flex items-center space-x-4">
    <div className="relative group">
      <NavLink to={`/dashboard/${auth.user.role}`} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-lg transition-all duration-300">
        <img 
          src={auth.user.avatar || "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"} 
          alt="User Avatar" 
          className="w-6 h-6 rounded-full border-2 border-white"
        />
        <span className="font-medium truncate max-w-[100px]">{auth.user.fullName}</span>
      </NavLink>
      <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-1/2 group-hover:transition-all duration-300"></span>
      <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-1/2 group-hover:transition-all duration-300"></span>
    </div>
    <button 
      onClick={handleLogout} 
      className="px-4 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
    >
      Logout
    </button>
  </div>
)}
          <Link to="/cart">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={1} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <CiSearch size="1.5em" color="#1493C8" className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            placeholder="Search courses, AI, IoT, etc"
            className="w-full pl-10 pr-12 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
          />
          <HiBars3 size="1.5em" color="#1493C8" className="absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <Link to="/contact" className="block text-gray-600 hover:text-blue-600 transition-colors">Contact Us</Link>
            <Link to="/offers" className="block text-gray-600 hover:text-blue-600 transition-colors">All Offers</Link>
            <Link to="/login" className="block text-gray-600 hover:text-blue-600 transition-colors">Account</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;