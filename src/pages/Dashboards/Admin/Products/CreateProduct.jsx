import React, { useState,useEffect } from 'react';
import { FiUpload, FiTag, FiBox, FiPercent, FiDollarSign, FiImage } from 'react-icons/fi';
import { FaRupeeSign } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { toast } from "react-toastify";

const ProductUploadPage = () => {
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState({
    title: '',
    subTitle: '',
    shortDescription: '',
    originalPrice: '',
    salesPrice: '',
    imageUrl: '',
    inStock: '',
    category: '',
    brand: '',
    seller_Name: '',
    tags: '',
    status: 'active',
    isFeatured: false,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDescriptionChange = (content) => {
    setProduct(prev => ({
      ...prev,
      description: content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    const requiredFields = [
      'title', 'subTitle', 'shortDescription', 'originalPrice', 'salesPrice', 'imageUrl',
      'inStock', 'category', 'brand', 'seller_Name', 'tags', 'description'
    ];

    for (const field of requiredFields) {
      if (!product[field]) {
        toast.error(`Field "${field}" is required`);
        return;
      }
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/create`, product);
      if (response.data.success) {
        toast.success('Product uploaded successfully');
        setProduct({
          title: '',
          subTitle: '',
          shortDescription: '',
          originalPrice: '',
          salesPrice: '',
          imageUrl: '',
          inStock: '',
          category: '',
          brand: '',
          seller_Name: '',
          tags: '',
          status: 'active',
          isFeatured: false,
          description: '',
        });
      } else {
        toast.error(response.data.message || 'Failed to upload product');
      }
    } catch (error) {
      toast.error('Server Error');
    }
  };

  const editorModules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],
      ['code-block']
    ],
  };
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center">
            EtherShop Product Upload
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={product.title}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                  placeholder="Enter product title"
                />
              </div>

              <div>
                <label htmlFor="subTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Sub-title
                </label>
                <input
                  type="text"
                  name="subTitle"
                  id="subTitle"
                  value={product.subTitle}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                  placeholder="Enter sub-title"
                />
              </div>

              <div>
                <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  id="shortDescription"
                  value={product.shortDescription}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                  placeholder="Brief product description"
                />
              </div>

              <div className="relative">
                <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRupeeSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="originalPrice"
                    id="originalPrice"
                    value={product.originalPrice}
                    onChange={handleChange}
                    className="block w-full pl-10 px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="salesPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Sales Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="salesPrice"
                    id="salesPrice"
                    value={product.salesPrice}
                    onChange={handleChange}
                    className="block w-full pl-10 px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiImage className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    value={product.imageUrl}
                    onChange={handleChange}
                    className="block w-full pl-10 px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="inStock" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiBox className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="inStock"
                    id="inStock"
                    value={product.inStock}
                    onChange={handleChange}
                    className="block w-full pl-10 px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                    placeholder="Enter stock quantity"
                  />
                </div>
              </div>

              <div>
  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
    Category
  </label>
  <select
    id="category"
    name="category"
    value={product.category}
    onChange={handleChange}
    className="block w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
  >
    {categories.map((category) => (
      <option key={category} value={category.name}>
        {category.name}
      </option>
    ))}
  </select>
</div>


              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={product.brand}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                  placeholder="Enter product brand"
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="seller_Name" className="block text-sm font-medium text-gray-700 mb-1">
                  Seller Name
                </label>
                <input
                  type="text"
                  name="seller_Name"
                  id="seller_Name"
                  value={product.seller_Name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                  placeholder="Enter seller name"
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  value={product.tags}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                  placeholder="Enter product tags (comma separated)"
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={product.status}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="col-span-2 flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  id="isFeatured"
                  checked={product.isFeatured}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                  Is Featured
                </label>
              </div>

              <div className="col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <ReactQuill
                  value={product.description}
                  onChange={handleDescriptionChange}
                  modules={editorModules}
                  className="rounded-lg bg-gray-100 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
              >
                <FiUpload className="h-5 w-5 text-white mr-2" />
                Upload Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUploadPage;
