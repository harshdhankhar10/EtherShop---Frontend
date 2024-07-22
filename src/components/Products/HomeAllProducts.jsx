import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart,FaStar, FaSearch, FaChevronRight } from "react-icons/fa";
import axios from 'axios';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <motion.div
      className="bg-white rounded-2xl  shadow-xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105"
      whileHover={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden group ">
        <motion.img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-48 object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          
        />
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="flex space-x-4">
            <motion.button
              className="p-3 bg-white rounded-full text-gray-800 hover:bg-blue-500 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaShoppingCart />
              
            </motion.button>
            <motion.button
              className="p-3 bg-white rounded-full text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaHeart />
            </motion.button>
            <motion.button
              className="p-3 bg-white rounded-full text-gray-800 hover:bg-green-500 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaSearch />
            </motion.button>
          </div>
        </motion.div>
        <motion.div 
          className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {product.isFeatured ? "Featured" : "New"}
        </motion.div>
      </div>
      <div className="p-6">
        <motion.h3 
          className="text-xl font-semibold text-gray-900 mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
         <Link to={`/product/${product.slug}`}> {product.title.slice(0, 50)+"..."}</Link>
        </motion.h3>
        <motion.p 
          className="text-gray-600 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {product.category}
        </motion.p>
        <div className="flex justify-between items-center mb-4">
          <motion.span 
            className="text-2xl font-bold text-blue-600"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
             ₹ {product.salesPrice}
          </motion.span>
          <motion.div 
            className="flex items-center"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="text-gray-600 ml-2">{product.rating}</span>
          </motion.div>
        </div>
        <motion.button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out flex items-center justify-center"
          whileHover={{ backgroundColor: "#2563EB" }}
          whileTap={{ scale: 0.95 }}
          
        >
          Add to Cart
          <FaShoppingCart className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const HomeAllProducts = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async()=>{
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/all`)
            setProducts(response.data.data)
        }
        fetchProducts()
    },[])

  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <motion.div 
          className="flex justify-between items-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900">All Products</h2>
          <Link to="/all-products" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center">
            View All
            <FaChevronRight className="ml-2" />
          </Link>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HomeAllProducts;