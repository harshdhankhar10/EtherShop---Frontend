import React, { useState } from 'react';
import { CiLocationOn, CiSearch } from 'react-icons/ci';
import { FaTimes, FaChevronDown } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { FaTruckFast } from 'react-icons/fa6';
import { BiSolidOffer } from 'react-icons/bi';
import { HiMiniBars3BottomLeft } from 'react-icons/hi2';
import { RiContactsFill } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { SiWish } from "react-icons/si";
import Searchbar from './Searchbar';
import { useSelector } from "react-redux";

function Navbar() {
    const [showBanner, setShowBanner] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [auth, setAuth] = useAuth();
    const cartItems = useSelector((state) => state.cart.items);
    const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const wishlistCount = wishlistItems.length;
    const handleLogout = () => {
        setAuth({ user: null, token: "" });
        localStorage.removeItem('auth');
        toast.success('Logged Out Successfully');
    };

    return (
        <nav className="bg-white shadow-lg">
            {/* Banner */}
            {showBanner && (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 md:px-6 flex flex-wrap justify-between items-center">
                    <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
                        <span className="font-semibold text-sm md:text-base">Limited Time Offer: Get 50% OFF on All Products!</span>
                        <Link to="/offer" className="bg-white text-blue-600 rounded-full px-4 py-1 text-sm font-semibold hover:bg-blue-50 transition-colors">
                            Learn More
                        </Link>
                    </div>
                    <FaTimes className="cursor-pointer hover:text-gray-200 transition-colors" onClick={() => setShowBanner(false)} />
                </div>
            )}

            {/* Upper Section */}
            <div className="bg-gray-100 hidden md:flex justify-between items-center px-6 py-2">
                <span className="text-gray-600 text-sm font-semibold">Welcome to Ecommerce MARKETPLACE!</span>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
                        <CiLocationOn color="#1493C8" size="1.2em" />
                        <span className="text-gray-600 text-sm font-semibold">
                            Address <span className="font-bold">INDIA</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                        <FaTruckFast color="#1493C8" size="1.2em" />
                        <Link to="/contact" className="text-gray-600 text-sm font-semibold">
                            Contact Us
                        </Link>
                    </div>
                    <div>
                        <Link to="/offers" className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
                        <BiSolidOffer color="#1493C8" size="1.2em" />
                        <span className="text-gray-600 text-sm font-semibold">All Offers</span>
                        </Link>
                    </div>
                    <Link 
  to="/wishlist" 
  className="group flex items-center space-x-2 py-2 px-3 rounded-md transition-all duration-300 hover:bg-gray-100"
>
  <SiWish className="text-gray-500 group-hover:text-blue-500 transition-colors duration-300" size="1.2em" />
  <span className="text-gray-600 text-sm font-semibold group-hover:text-blue-600 transition-colors duration-300">
    My Wishlist
  </span>
  {wishlistCount > 0 && (
    <span className="bg-blue-100 text-blue-600 text-xs  font-semibold px-2 py-1 rounded-full transition-all duration-300 group-hover:bg-blue-200">
      {wishlistCount}
    </span>
  )}
</Link>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="flex flex-wrap justify-between items-center px-4 md:px-6 py-4">
                <div className="flex items-center gap-2 md:gap-4">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden hover:bg-blue-100 rounded-full p-2 transition-colors">
                        <HiMiniBars3BottomLeft size="1.8em" color="#1493C8" />
                    </button>
                    <Link to="/" className="text-2xl md:text-3xl font-bold text-blue-600 flex items-center gap-2 hover:text-blue-700 transition-colors">
                        <LocalMallIcon style={{ fontSize: "1.4em" }} />
                        <span className="hidden md:inline">EtherShop</span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex-grow max-w-2xl mx-4">
                    <Searchbar />
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
                    <Link to="/cart" className="group relative">
                        <div className="relative inline-flex items-center justify-center p-3 text-blue-600 bg-blue-100 rounded-full transition-all duration-300 ease-in-out group-hover:bg-blue-200">
                            <FiShoppingCart className="text-xl group-hover:scale-110 transition-transform duration-300" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </div>
                        <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-1/2 group-hover:transition-all duration-300"></span>
                        <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-1/2 group-hover:transition-all duration-300"></span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;