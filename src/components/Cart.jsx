import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../redux/slices/cartSlice';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { FaTrash, FaTag, FaTruck, FaPercent, FaMinus, FaPlus, FaShoppingCart, FaArrowLeft, FaCreditCard, FaPaypal } from 'react-icons/fa';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link,useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.error('Item removed from cart', { position: 'bottom-right', autoClose: 2000 });
  };

  const handleUpdateQuantity = (_id, quantity) => {
    dispatch(updateCartItemQuantity({ _id, quantity }));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.salesPrice * item.quantity, 0);
  const shippingFee = subtotal > 1000 ? 0 : 50;
  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shippingFee + taxAmount - discountAmount;

  const applyCoupon = async (e) => {
    e.preventDefault();
    setIsApplyingCoupon(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/coupon/status`, { coupon: couponCode });
      if (response.data.success) {
        if (response.data.coupon.expiry < new Date().toISOString()) {
          toast.error('Coupon has expired', { position: 'bottom-right' });
          return;
        }
        setDiscount(response.data.coupon.discount);
        toast.success('Coupon applied successfully', { position: 'bottom-right' });
      } else {
        toast.error('Invalid coupon code', { position: 'bottom-right' });
      }
    } catch (error) {
      toast.error('Error applying coupon', { position: 'bottom-right' });
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  useEffect(() => {
    // Simulating loading state
    const timer = setTimeout(() => setIsApplyingCoupon(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCheckout = ()=>{
    navigate('/checkout', { state: {cartItems, subtotal, shippingFee, taxAmount, discount,  discountAmount, total } }); 
  }

  return (
    <>
      <Navbar />
      <Helmet>
        <title>{`Your Cart - EtherShop`}</title>
      </Helmet>
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Your Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto"
            >
              <FaShoppingCart className="text-7xl text-gray-300 mx-auto mb-6" />
              <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
              <button className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300 text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Continue Shopping
              </button>
            </motion.div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:w-2/3"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Cart Items</h2>
                    <AnimatePresence>
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-between py-6 border-b border-gray-200 last:border-b-0"
                        >
                          <div className="flex items-center space-x-4">
                            <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                              <p className="text-sm text-gray-600">{item.category}</p>
                              <p className="text-lg font-bold text-blue-600 mt-1">₹ {item.salesPrice.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center border border-gray-300 rounded-full">
                              <button
                                onClick={() => handleUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                              >
                                <FaMinus />
                              </button>
                              <span className="px-3 py-1 text-gray-800 font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                              >
                                <FaPlus />
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveFromCart(item._id)}
                              className="text-red-500 hover:text-red-700 transition-colors duration-200"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/3"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shippingFee === 0 ? 'Free' : `₹ ${shippingFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (18%)</span>
                      <span>₹ {taxAmount.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span>Discount ({discount}%)</span>
                        <span>- ₹ {discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                        <span>Total</span>
                        <span>₹ {total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <form onSubmit={applyCoupon} className="flex items-center mb-6">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        disabled={isApplyingCoupon}
                        className={`bg-blue-500 text-white px-6 py-2 rounded-r-full hover:bg-blue-600 transition-colors duration-300 ${
                          isApplyingCoupon ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {isApplyingCoupon ? 'Applying...' : 'Apply'}
                      </button>
                    </form>
                    <div className="text-sm text-gray-600 space-y-2 mb-8">
                      <div className="flex items-center">
                        <FaTruck className="mr-2 text-blue-500" />
                        <span>Free shipping on orders over ₹1000</span>
                      </div>
                      <div className="flex items-center">
                        <FaPercent className="mr-2 text-blue-500" />
                        <span>Tax included at checkout</span>
                      </div>
                    </div>
                   
                   <button onClick={handleCheckout} className="w-full bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1">
                      Proceed to Checkout
                    </button>
                   
                    <div className="mt-4 flex justify-center space-x-4">
                      <FaCreditCard className="text-gray-400 text-2xl" />
                      <FaPaypal className="text-gray-400 text-2xl" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          <div className="mt-12 text-center">
            <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-300">
              <FaArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;