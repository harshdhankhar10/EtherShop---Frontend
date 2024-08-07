import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiSearch, FiHeart, FiEye } from 'react-icons/fi';

const ProductCard = ({ product, isInCart, onToggleCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl relative"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-md">
        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-110" />
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className={`p-2 rounded-full ${isInCart ? 'bg-red-500' : 'bg-white'} text-${isInCart ? 'white' : 'gray-800'} hover:bg-opacity-80`}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggleCart(product)}
              >
                <FiShoppingCart size={20} />
              </motion.button>
              <motion.button
                className="p-2 rounded-full bg-white text-gray-800 hover:bg-opacity-80"
                whileTap={{ scale: 0.95 }}
              >
                <FiHeart size={20} />
              </motion.button>
              <motion.button
                className="p-2 rounded-full bg-white text-gray-800 hover:bg-opacity-80"
                whileTap={{ scale: 0.95 }}
              >
                <FiEye size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2 truncate">{product.title}</h2>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-indigo-600">₹{product.salesPrice}</span>
      </div>
    </motion.div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/all`);
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleToggleCart = (product) => {
    const isInCart = cartItems.some(item => item._id === product._id);
    if (isInCart) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <div className="relative">
            <input
              type="search"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isInCart={cartItems.some(item => item._id === product._id)}
              onToggleCart={handleToggleCart}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsPage;