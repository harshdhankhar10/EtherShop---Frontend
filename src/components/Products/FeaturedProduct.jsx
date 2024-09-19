import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductCard = ({ product, isInCart, isInWishlist, onToggleCart, onToggleWishlist }) => {
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
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-110" 
        />
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
                className={`p-2 rounded-full ${isInCart ? 'bg-red-500' : 'bg-white'} ${isInCart ? 'text-white' : 'text-gray-800'} hover:bg-opacity-80`}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggleCart(product)}
              >
                <FiShoppingCart size={20} />
              </motion.button>
              <motion.button
                className={`p-2 rounded-full ${isInWishlist ? 'bg-red-500' : 'bg-white'} ${isInWishlist ? 'text-white' : 'text-gray-800'} hover:bg-opacity-80`}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggleWishlist(product)}
              >
                <FiHeart size={20} />
              </motion.button>
              <motion.button
                className="p-2 rounded-full bg-white text-gray-800 hover:bg-opacity-80"
                whileTap={{ scale: 0.95 }}
              >
                <Link to={`/product/${product.slug}`}>
                  <FiEye size={20} />
                </Link>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2 truncate hover:text-[#3A55E8]">
        <Link to={`/product/${product.slug}`}>{product.title}</Link>
      </h2>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-indigo-600">₹{product.salesPrice}</span>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/all`);
        setFeaturedProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleToggleCart = (product) => {
    const isInCart = cartItems.some(item => item._id === product._id);
    if (isInCart) {
      dispatch(removeFromCart(product._id));
      toast.error('Item removed from cart');
    } else {
      dispatch(addToCart(product));
      toast.success('Item added to cart');
    }
  };

  const handleToggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item._id === product._id);
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.error('Item removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Item added to wishlist');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full px-4 mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {featuredProducts.map((product) => 
            product.isFeatured && (
              <ProductCard 
                key={product._id} 
                product={product} 
                isInCart={cartItems.some(item => item._id === product._id)} 
                isInWishlist={wishlistItems.some(item => item._id === product._id)}
                onToggleCart={handleToggleCart} 
                onToggleWishlist={handleToggleWishlist}
              />
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
