import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaRocket, FaChartLine } from 'react-icons/fa';
import axios from "axios"

const BlogSection = () => {
  const [auth, setAuth] = useState(null);
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    setAuth(storedAuth?.user || null);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const storedAuth = JSON.parse(localStorage.getItem('auth'));
        if (storedAuth && storedAuth.token) {
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/mail/newslettermail`, {
            headers: { Authorization: JSON.parse(localStorage.getItem('auth')).token }
          });
          setBlog(response.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  if (!auth) {
    return (
      <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">
              Unlock a World of E-commerce Insights
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Gain access to exclusive content, expert analysis, and cutting-edge strategies 
              that will revolutionize your e-commerce journey.
            </p>
            <div className="inline-block p-1 bg-white rounded-lg shadow-lg">
              <Link 
                to="/login" 
                className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
              >
                <FaLock className="mr-2" />
                Login to Unlock Blog Content
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm">
              <FaRocket className="text-4xl mb-4 text-yellow-300" />
              <h3 className="text-2xl font-bold mb-4">Trending Topics</h3>
              <p>Stay ahead of the curve with our curated selection of the hottest e-commerce trends and innovations.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm">
              <FaChartLine className="text-4xl mb-4 text-green-300" />
              <h3 className="text-2xl font-bold mb-4">Data-Driven Insights</h3>
              <p>Dive deep into analytics and market research to make informed decisions for your online business.</p>
            </div>
            <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm">
              <FaLock className="text-4xl mb-4 text-blue-300" />
              <h3 className="text-2xl font-bold mb-4">Exclusive Content</h3>
              <p>Access members-only articles, case studies, and expert interviews to elevate your e-commerce strategy.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Insights Hub</h2>
        <p className="text-xl text-gray-600 ">Stay ahead with the latest e-commerce trends and strategies</p>
        
        {/* Featured Post */}
        {blog.map((post, index) => {
          return (
            <div key={index} className="relative bg-white rounded-xl overflow-hidden shadow-lg transition duration-300 hover:shadow-xl mb-8">
              {post.isFeatured && (
                <>
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white px-4 py-1 rounded-full text-xm font-medium">
                    Featured
                  </div>
                  <img
                    src={post.imageURL}
                    alt={post.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>{post.createdAt}</span>
                      <span className="mx-2">•</span>
                      <span>{post.minutesRead} Minutes Read</span>
                    </div>
                    <p className="text-gray-600 line-clamp-3 mb-4">{post.subtitle}</p>
                    <Link to={`/blog/${post.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                      Read More →
                    </Link>
                  </div>
                </>
              )}
            </div>
          );
        })}

        {/* Regular Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blog.map((post, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
              <img 
                src={post.imageURL} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold mb-2">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>{post.createdAt}</span>
                  <span className="mx-2">•</span>
                  <span>{post.minutesRead} Minutes Read</span>
                </div>
                <p className="text-gray-600 line-clamp-3 mb-4">{post.subtitle}</p>
                <Link 
                  to={`/blog/${post.id}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/blog"
            className="inline-block px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Explore All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
