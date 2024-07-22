import React,{useState,useEffect} from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  
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
        
        Swal.fire('Error!', 'Failed to fetch categories', 'error');
    }
};

  
  return (
    <section className="bg-[#E2EDFB] py-8 px-4">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Explore Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
          {categories.map((category) => (
            <motion.div
              key={category._id}
              className={`bg-gradient-to-br ${category.name} rounded-xl shadow-lg bg-gray-100 overflow-hidden `}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="p-6 flex flex-col items-center justify-center h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
               <Link to={`/categories/${category.slug}`}>
               <img src={category.image} alt={category.name} className="text-4xl mb-3 h-12" />
                <h3 className="text-xl font-semibold text-gray-600 text-center">
                  {category.name}
                </h3>
               </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;