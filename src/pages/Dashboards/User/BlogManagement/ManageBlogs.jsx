// ManageBlogs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash, FaClock, FaUser, FaTags } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import EditBlogModal from './EditBlog';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blog/my-blogs`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('auth')).token
        }
      });
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (blogId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blog/delete-blog/${blogId}`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('auth')).token
          }
        });

        if (response.data.success) {
          Swal.fire(
            'Deleted!',
            'Your blog has been deleted.',
            'success'
          );
          setBlogs(blogs.filter((blog) => blog._id !== blogId));
        }
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog. Please try again.');
    }
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedBlog(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateBlog = (updatedBlog) => {
    if (updatedBlog && updatedBlog._id) {
      setBlogs(blogs.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog));
    } else {
      console.error('Updated blog or blog._id is undefined');
    }
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Manage Your Blogs</h1>
        {blogs.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">You haven't created any blogs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <div key={blog._id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
                <div className="relative">
                  <img src={blog.imageURL} alt={blog.title} className="w-full h-64 object-cover" />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-4 rounded-full text-sm font-semibold">
                    {blog.category}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800 line-clamp-2">{blog.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.subtitle}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <FaClock />
                      <span>{blog.minutesRead} min read</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaUser />
                      <span>{blog.authorName}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Link to={`/blog/${blog._id}`} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-300" aria-label="View blog">
                        <FaEye className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => openEditModal(blog)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors duration-300"
                        aria-label="Edit blog"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeletePost(blog._id)} 
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-300"
                        aria-label="Delete blog"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                    <Link to={`/blog/${blog._id}`} className="inline-block">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <EditBlogModal
        blog={selectedBlog}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onUpdate={handleUpdateBlog}
      />
    </div>
  );
};

export default ManageBlogs;