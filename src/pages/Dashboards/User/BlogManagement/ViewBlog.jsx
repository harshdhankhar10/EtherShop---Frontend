import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaUser, FaClock, FaCalendar, FaTags, FaFacebook, FaTwitter, FaLinkedin, FaBookmark } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import Footer from '../../../../components/Footer';
import Navbar from '../../../../components/Navbar';

const ViewBlog = () => {
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blog/blog/${id}`);
      setBlog(response.data.blog);
      // Fetch related posts and categories here.relatedBlogs);
      // setRelatedPosts(response.data.relatedPosts);
      // setCategories(response.data.categories);
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blog/related-blogs/${blog._id}`);
      setRelatedPosts(response.data.relatedBlogs);
    };
    if (blog) fetchRelatedPosts();
  }, [blog]);


  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blog/all-categories`);
      setCategories(response.data.categories);
    };
    fetchCategories();
  }, []);



  if (!blog) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
   <>
    <Navbar />
     <div className="bg-gray-100 min-h-screen">
      <Helmet>
        <title>{blog.metaTitle} - EtherShop</title>
        <meta name="description" content={blog.metaDescription} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <article className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-64 md:h-96">
                <img src={blog.imageURL} alt={blog.title} className="w-full h-full object-cover" />
                {blog.isFeatured && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
                <h2 className="text-xl text-gray-600 mb-6 font-light italic">{blog.subtitle}</h2>

                {/* Metadata */}
                <div className="flex flex-wrap items-center text-gray-500 mb-8 gap-4">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    <span>{blog.authorName}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <span>{blog.minutesRead} min read</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="mr-2" />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBookmark className="mr-2" />
                    <span>{blog.category}</span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />

                {/* Tags */}
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <FaTags className="text-gray-400" />
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Share buttons */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                  <div className="flex space-x-4">
                    <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
                      <FaFacebook />
                    </button>
                    <button className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors duration-300">
                      <FaTwitter />
                    </button>
                    <button className="p-3 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors duration-300">
                      <FaLinkedin />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Categories */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
    <h3 className="text-xl font-bold text-white">Categories</h3>
  </div>
  <ul className="divide-y divide-gray-200">
    {categories.map((category, index) => (
      <li key={index}>
        <a 
          href={`/category/${category.slug}`} 
          className="flex items-center justify-between p-4 hover:bg-gray-50 transition duration-150 ease-in-out"
        >
          <div className="flex items-center">
            <span className="text-lg text-gray-700 font-medium">{category}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      </li>
    ))}
  </ul>
</div>

            {/* Related Posts */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
              <ul className="space-y-4">
                {relatedPosts.map((post, index) => (
                  <li key={index} className="flex items-center space-x-4">
                    <img src={post.imageURL} alt={post.title} className="w-20 h-20 object-cover rounded" />
                    <div> 
                     <Link to={`/blog/${post._id}`} className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                      <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
   </>
  );
};

export default ViewBlog;