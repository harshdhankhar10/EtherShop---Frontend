import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CountdownUnit = ({ value, label }) => (
  <motion.div 
    className="flex flex-col items-center bg-blue-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-3 w-24"
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <span className="text-4xl font-bold text-red-400 mb-1">{value}</span>
    <span className="text-xs uppercase tracking-wide text-gray-700 font-bold">{label}</span>
  </motion.div>
);

const FlashSaleCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [couponRevealed, setCouponRevealed] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date("2024-12-31") - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const revealCoupon = () => {
    setCouponRevealed(true);
  };

  return (
    <section className="bg-[#E2EDFC] py-20 px-4">
      <div className="container mx-auto w-full">
        <motion.div 
          className="text-center bg-blue-100 bg-opacity-10 backdrop-blur-md rounded-3xl p-10 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl font-extrabold text-gray-700 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Epic Flash Sale Countdown
          </motion.h2>
          <div className="flex justify-center space-x-4 mb-12 ">
            <CountdownUnit  value={timeLeft.days} label="Days" />
            <CountdownUnit  value={timeLeft.hours} label="Hours" />
            <CountdownUnit  value={timeLeft.minutes} label="Minutes" />
            <CountdownUnit  value={timeLeft.seconds} label="Seconds" />
          </div>
          <motion.div
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-xl text-gray-600 mb-6">
              Don't miss out on our biggest sale of the year! Incredible deals await.
            </p>
            <AnimatePresence>
              {!couponRevealed ? (
                <motion.button
                  className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-yellow-300 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={revealCoupon}
                  exit={{ opacity: 0 }}
                >
                  Reveal Secret Coupon
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="bg-white py-3 px-6 rounded-lg inline-block"
                >
                  <p className="text-gray-800 font-semibold mb-1">Your Exclusive Coupon:</p>
                  <p className="text-3xl font-bold text-purple-600">FLASH50</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <p className="mb-2">🎉 Up to 70% off on select items</p>
            <p className="mb-2">🚚 Free shipping on orders over $50</p>
            <p>⏰ Limited time offer - Act fast!</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlashSaleCountdown;