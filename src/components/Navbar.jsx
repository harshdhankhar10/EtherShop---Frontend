import React, { useState } from 'react';
import { CiLocationOn, CiSearch } from 'react-icons/ci';
import { FaShoppingCart, FaTimes, FaChevronDown } from 'react-icons/fa';
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
import Searchbar from './Searchbar';
import { useSelector } from "react-redux";

function Navbar() {
  const [showBanner, setShowBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ""
    });
    localStorage.removeItem('auth');
    toast.success('Logged Out Successfully');
  };

  const categories = [
    { name: "Electronics", subcategories: ["Smartphones", "Laptops", "Cameras", "Audio"] },
    { name: "Clothing", subcategories: ["Men's", "Women's", "Kids", "Accessories"] },
    { name: "Home & Garden", subcategories: ["Furniture", "Decor", "Kitchen", "Outdoor"] },
    { name: "Sports & Outdoors", subcategories: ["Fitness", "Camping", "Bikes", "Team Sports"] },
  ];

  const brands = [
    { name: "Apple", categories: ["iPhones", "MacBooks", "iPads", "Accessories"] },
    { name: "Samsung", categories: ["Galaxy Phones", "TVs", "Home Appliances"] },
    { name: "Nike", categories: ["Shoes", "Apparel", "Accessories"] },
    { name: "Adidas", categories: ["Sneakers", "Sportswear", "Equipment"] },
  ];

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
          <Link to="/" className="text-2xl md:text-3xl font-bold text-blue-600 flex items-center gap-1">
            <LocalMallIcon style={{ fontSize: "1.4em" }} />EtherShop
          </Link>
        </div>

        {/* Search Bar */}
        <Searchbar />

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
              <StyledBadge badgeContent={cartItemsCount} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>
      </div>

      {/* Categories and Brands Navbar */}
      <div className="hidden md:block bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between items-center py-2">
            {categories.map((category, index) => (
              <li key={index} className="group relative">
                <button className="text-gray-700 hover:text-blue-600 py-2 flex items-center gap-1 transition-colors">
                  {category.name} <FaChevronDown size="0.8em" />
                </button>
                <div className="absolute left-0 top-full bg-white shadow-lg rounded-b-lg p-4 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <ul>
                    {category.subcategories.map((subcat, subIndex) => (
                      <li key={subIndex}>
                        <Link to={`/category/${category.name.toLowerCase()}/${subcat.toLowerCase()}`} className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                          {subcat}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <li className="group relative">
              <button className="text-gray-700 hover:text-blue-600 py-2 flex items-center gap-1 transition-colors">
                Brands <FaChevronDown size="0.8em" />
              </button>
              <div className="absolute right-0 top-full bg-white shadow-lg rounded-b-lg p-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="grid grid-cols-2 gap-4">
                  {brands.map((brand, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-800 mb-2">{brand.name}</h3>
                      <ul>
                        {brand.categories.map((cat, catIndex) => (
                          <li key={catIndex}>
                            <Link to={`/brand/${brand.name.toLowerCase()}/${cat.toLowerCase()}`} className="block py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                              {cat}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            {categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
                <ul className="pl-4 space-y-1">
                  {category.subcategories.map((subcat, subIndex) => (
                    <li key={subIndex}>
                      <Link to={`/category/${category.name.toLowerCase()}/${subcat.toLowerCase()}`} className="block text-gray-600 hover:text-blue-600 transition-colors">
                        {subcat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Brands</h3>
              <ul className="pl-4 space-y-1">
                {brands.map((brand, index) => (
                  <li key={index}>
                    <Link to={`/brand/${brand.name.toLowerCase()}`} className="block text-gray-600 hover:text-blue-600 transition-colors">
                      {brand.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/deals" className="block text-gray-600 hover:text-blue-600 transition-colors">Deals</Link>
            <Link to="/new-arrivals" className="block text-gray-600 hover:text-blue-600 transition-colors">New Arrivals</Link>
            <Link to="/contact" className="block text-gray-600 hover:text-blue-600 transition-colors">Contact Us</Link>
            <Link to="/wishlist" className="block text-gray-600 hover:text-blue-600 transition-colors">My Wishlist</Link>
            {auth.user ? (
              <>
                <Link to={`/dashboard/${auth.user.role}`} className="block text-gray-600 hover:text-blue-600 transition-colors">Dashboard</Link>
                <button onClick={handleLogout} className="block text-red-500 hover:text-red-600 transition-colors">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block text-gray-600 hover:text-blue-600 transition-colors">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;