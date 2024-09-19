import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import { Helmet } from 'react-helmet';
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

const CategoryBasedProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/category/${params.slug}`);
        setProducts(response.data.data);
        setCategory(response.data.category);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryAndProducts();
  }, [params.slug]);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{category.name} Category - EtherShop</title>
        <meta name="description" content={category.description} />
      </Helmet>
      <Navbar />
      <div className="w-full mx-auto py-12 px-4 sm:px-6 lg:px-4">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">Category</div>
              <h1 className="mt-1 text-4xl font-extrabold text-gray-900 leading-tight">
                {category.name}
              </h1>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                {category.description}
              </p>
              <div className="mt-6">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {products.length} Products
                </span>
              </div>
            </div>
            <div className='w-full flex flex-col items-center justify-center px-6'>
              {category.image && (
                <div className="md:flex-shrink-0">
                  <img className="h-full w-full object-cover md:w-64" src={category.image} alt={category.name} />
                </div>
              )}
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white shadow-md rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard 
                key={product._id}
                product={product}
                isInCart={cartItems.some(item => item._id === product._id)}
                isInWishlist={wishlistItems.some(item => item._id === product._id)}
                onToggleCart={handleToggleCart}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBasedProducts;
