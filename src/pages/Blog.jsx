import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import axios from 'axios'
import Navbar from '../components/Navbar'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blog/all-blogs`);
                setBlogs(response.data.blogs);
                setFilteredBlogs(response.data.blogs);
                const uniqueCategories = ['All', ...new Set(response.data.blogs.map(blog => blog.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const results = blogs.filter(blog =>
            (selectedCategory === 'All' || blog.category === selectedCategory) &&
            (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             blog.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
             blog.authorName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredBlogs(results);
    }, [selectedCategory, searchTerm, blogs]);

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    return (
        <>
            <Helmet>
                <title>Blog - EtherShop</title>
                <meta name="description" content="Read the latest blogs" />
            </Helmet>
            <Navbar />
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-6xl font-extrabold text-gray-900 mb-16 text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                            Insights & Inspirations
                        </span>
                    </h1>

                    <div className="mb-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="relative w-full md:w-1/3">
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        selectedCategory === category
                                            ? 'bg-indigo-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-indigo-100'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredBlogs.length > 0 ? (
                        <>
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-24"
                            >
                                <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-2xl overflow-hidden">
                                    <img src={filteredBlogs[0].imageURL} alt={filteredBlogs[0].title} className="w-full md:w-1/2 h-96 object-cover" />
                                    <div className="p-8 md:w-1/2">
                                        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">{filteredBlogs[0].category}</span>
                                        <Link to={`/blog/${filteredBlogs[0]._id}`}>
                                       <h2 className="mt-2 text-4xl font-bold text-gray-900 leading-tight hover:text-indigo-600 transition-colors duration-300">{filteredBlogs[0].title}</h2>
                                       </Link>
                                        <p className="mt-4 text-xl text-gray-600">{filteredBlogs[0].subtitle}</p>
                                        <div className="mt-6 flex items-center">
                                            <img className="h-10 w-10 rounded-full object-cover" src={`https://ui-avatars.com/api/?name=${filteredBlogs[0].authorName}&background=random`} alt={filteredBlogs[0].authorName} />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">{filteredBlogs[0].authorName}</p>
                                                <div className="flex space-x-1 text-sm text-gray-500">
                                                    <time dateTime="2020-03-16">{formatDate(filteredBlogs[0].createdAt)}</time>
                                                    <span aria-hidden="true">&middot;</span>
                                                    <span>{filteredBlogs[0].minutesRead} min read</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <AnimatePresence>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                    {filteredBlogs.slice(1).map((blog, index) => (
                                        <motion.div
                                            key={blog._id}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -50 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
                                        >
                                            <div className="relative flex-shrink-0">
                                                <img className="h-48 w-full object-cover" src={blog.imageURL} alt={blog.title} />
                                                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black to-transparent">
                                                    <span className="text-xs text-white font-semibold">{blog.category}</span>
                                                </div>
                                            </div>
                                            <div className="flex-1 p-6 flex flex-col justify-between">
                                                <div className="flex-1">
                                                    <a href="#" className="block mt-2">
                                                        <Link to={`/blog/${blog._id}`}>
                                                        <p className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-300">{blog.title}</p>
                                                        </Link>

                                                        <p className="mt-3 text-base text-gray-500">{blog.subtitle}</p>
                                                    </a>
                                                </div>
                                                <div className="mt-6 flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <img className="h-8 w-8 rounded-full object-cover" src={`https://ui-avatars.com/api/?name=${blog.authorName}&background=random`} alt={blog.authorName} />
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">{blog.authorName}</p>

                                                             <div className="flex space-x-1 text-sm text-gray-500">
                                                    <time dateTime="2020-03-16">{formatDate(blog.createdAt)}</time>
                                                    <span aria-hidden="true">&middot;</span>
                                                    <span>{blog.minutesRead} min read</span>
                                                </div>
                                                        </div>
                                                    </div>
                                                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                                        <Link to={`/blog/${blog._id}`}>Read More</Link>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </AnimatePresence>
                        </>
                    ) : (
                        <div className="text-center text-gray-600 mt-12">
                            <p className="text-2xl font-semibold">No blogs found</p>
                            <p className="mt-2">Try adjusting your search or filter to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Blog