import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const images = [
  { src: 'https://img.freepik.com/free-vector/flat-design-food-twitch-banner_23-2149109650.jpg?t=st=1720608970~exp=1720609570~hmac=c0639fa2f4d9fa60ce1289c3a15124f6ab0ee45906d54fa9ab9b0f56bc2c5481', title: 'Summer Collection' },
  { src: 'https://img.freepik.com/free-vector/flat-design-pizza-time-facebook-cover_23-2149135569.jpg?t=st=1720608952~exp=1720609552~hmac=b94413350b52e2c47949a2fab45d31d078acc9ca68c7189013678af9e3590842', title: 'Autumn Styles' },
  { src: 'https://img.freepik.com/premium-psd/free-psd-fashion-big-sale-social-media-instagram-post_220346-2099.jpg', title: 'Winter Essentials' },
  { src: 'https://img.freepik.com/free-psd/e-commerce-special-sale-banner-template_23-2149006699.jpg?t=st=1720608906~exp=1720609506~hmac=701bd3403f82363aa7fcbc4ba2b836d79be05013599148960d1fb4ac2cb334e3', title: 'Spring Fashion' },
];


const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const progressRef = useRef(null);
  const progressAnimation = useAnimation();

  useEffect(() => {
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    progressAnimation.start({
      scaleX: 1,
      transition: { duration: 6, ease: 'linear' },
    });
    return () => progressAnimation.stop();
  }, [currentIndex, progressAnimation]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    progressAnimation.set({ scaleX: 0 });
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    progressAnimation.set({ scaleX: 0 });
  };

  const slideVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    }),
  };

  return (
    <div className="relative  h-96 rounded-md overflow-hidden bg-gray-900 mx-4">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.img
            src={images[currentIndex].src}
            alt={images[currentIndex].title}
            className="absolute w-full h-full object-cover"
            style={{ filter: 'brightness(0.7)' }}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: 'easeOut' }}
          />
          <div className="relative z-10 text-center">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl font-bold text-white mb-4"
            >
              {images[currentIndex].title}
            </motion.h2>
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300"
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
        <motion.div
          ref={progressRef}
          className="h-full bg-white"
          initial={{ scaleX: 0 }}
          animate={progressAnimation}
        />
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
              progressAnimation.set({ scaleX: 0 });
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            } transition duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;