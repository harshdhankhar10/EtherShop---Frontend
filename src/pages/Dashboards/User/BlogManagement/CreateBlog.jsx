import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', imageURL: '', subtitle: '', category: '', minutesRead: '',
    content: '', authorName: '', tags: [], metaTitle: '', metaDescription: '', metaKeywords: '',
    isFeatured :false
  });
  const [currentTag, setCurrentTag] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blog/create-blog`, formData, {
        headers: { Authorization: JSON.parse(localStorage.getItem('auth')).token }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/dashboard/user/home/blog-management/manage-blogs'); 
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  const addTag = () => {
    if (currentTag.trim() !== '') {
      setFormData({ ...formData, tags: [...formData.tags, currentTag.trim()] });
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="px-8 py-10">
          <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-10">Create Your Masterpiece</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Title" name="title" value={formData.title} onChange={handleChange} />
              <InputField label="Image URL" name="imageURL" value={formData.imageURL} onChange={handleChange} />
              <InputField label="Subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} />
              <InputField label="Category" name="category" value={formData.category} onChange={handleChange} />
              <InputField label="Minutes Read" name="minutesRead" type="number" value={formData.minutesRead} onChange={handleChange} />
              <InputField label="Author Name" name="authorName" value={formData.authorName} onChange={handleChange} />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
              <ReactQuill 
                theme="snow" 
                value={formData.content} 
                onChange={(content) => setFormData({ ...formData, content })} 
                className="h-64 mb-12 bg-gray-50 rounded-lg"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 inline-flex text-indigo-400 hover:text-indigo-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Meta Title" name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
              <InputField label="Meta Keywords" name="metaKeywords" value={formData.metaKeywords} onChange={handleChange} />
            </div>
            <InputField label="Meta Description" name="metaDescription" value={formData.metaDescription} onChange={handleChange} />
            {/* adding isFeatured with best ui design */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isFeatured"
                value={formData.isFeatured}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label  className="text-sm font-semibold text-gray-700"> Featured</label>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
              >
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

export default CreateBlog;