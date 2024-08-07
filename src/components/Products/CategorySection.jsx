import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/all`);
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold text-center mb-16 text-indigo-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Categories
        </motion.h2>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.div
              key={category._id}
              className="relative group"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredCategory(category._id)}
              onHoverEnd={() => setHoveredCategory(null)}
            >
              <Link to={`/categories/${category.slug}`} className="block">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 group-hover:shadow-2xl">
                  <div className="p-6 flex flex-col items-center justify-center h-full">
                    <img src={category.image} alt={category.name} className="w-24 h-24 object-contain mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 text-center group-hover:text-indigo-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <AnimatePresence>
                  {hoveredCategory === category._id && (
                    <motion.div
                      className="absolute inset-0 bg-indigo-600 bg-opacity-80 rounded-2xl flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-white text-lg font-semibold">Explore Now</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;