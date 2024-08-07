import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import {toast} from 'react-toastify';
const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [status, setStatus] = useState('draft');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [slug, setSlug] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [category, setCategory] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [tags, setTags] = useState([]);

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    const blogData = {
      title,
      content,
      authorName,
      authorEmail,
      status,
      metaTitle,
      metaDescription,
      metaKeywords,
      slug,
      publishedAt,
      category,
      isFeatured,
      tags
    };

    e.preventDefault();
   const response =  await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blog/create-blog`, blogData,
    {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('auth')).token
      }
    }
   )
   console.log(response)
    if(response.success){
      toast.success(response.message);   
    }
    else{
      toast.error(response.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-2xl">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Create New Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="Enter blog title"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <ReactQuill
  theme="snow"
  value={content}
  onChange={setContent}
  className="h-64 mb-12 bg-white rounded-md shadow-sm"
/>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">Author Name</label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Enter author name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700">Author Email</label>
            <input
              type="email"
              id="authorEmail"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Enter author email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">Meta Title</label>
          <input
            type="text"
            id="metaTitle"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="Enter meta title"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">Meta Description</label>
          <textarea
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="Enter meta description"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700">Meta Keywords</label>
          <input
            type="text"
            id="metaKeywords"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="Enter meta keywords"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="Enter slug"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700">Publish Date</label>
          <input
            type="datetime-local"
            id="publishedAt"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
          <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md bg-white">
            {tags.map((tag, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
                {tag}
                <button type="button" onClick={() => removeTag(index)} className="ml-1 text-indigo-600 hover:text-indigo-800">
                  &times;
                </button>
              </span>
            ))}
            <input
              type="text"
              onKeyPress={handleTagAdd}
              placeholder="Add a tag and press Enter"
              className="flex-grow outline-none bg-transparent p-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
  type="text"
  id="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
  placeholder="Enter category"
  required
/>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isFeatured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">Featured Post</label>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-102"
        >
          Create Blog Post
        </button>
      </form>
    </div>
  );
};

export default BlogForm;