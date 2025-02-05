import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEye, FiEdit, FiTrash2, FiSearch, FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import "quill/dist/quill.snow.css";

import Swal from 'sweetalert2';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/all`);
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Error fetching products', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredProducts = sortedProducts.filter(
    (product) =>
      (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || product.category === selectedCategory)
  );

  const handleView = (product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const handleDelete = (product) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${product.title}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmDelete(product._id);
      }
    });
  };

  const confirmDelete = async (productId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/delete/${productId}`);
      if (response.data.success) {
        Swal.fire('Deleted!', response.data.message, 'success');
        fetchProducts();
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Error deleting product', 'error');
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/update/${editedProduct._id}`, editedProduct);
      if (response.data.success) {
        Swal.fire('Updated!', 'Product has been updated successfully.', 'success');
        setIsEditModalOpen(false);
        fetchProducts();
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Error updating product', 'error');
    }
  };

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <Link to="/dashboard/admin/product/create" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition duration-300">
            <FiPlus className="mr-2" /> Add Product
          </Link>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="w-full sm:w-48 pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition duration-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    {['Brand', 'Category', 'Price', 'Stock'].map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort(header.toLowerCase())}
                      >
                        <div className="flex items-center">
                          {header}
                          {sortColumn === header.toLowerCase() && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src={product.imageUrl} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{product.brand}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">${product.salesPrice}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{product.inStock}</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          <button onClick={() => handleView(product)} className="text-blue-600 hover:text-blue-900 transition duration-300">
                            <FiEye className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleEdit(product)} className="text-yellow-600 hover:text-yellow-900 transition duration-300">
                            <FiEdit className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleDelete(product)} className="text-red-600 hover:text-red-900 transition duration-300">
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.title}</h2>
            <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Price:</strong> ${selectedProduct.salesPrice}</p>
            <p><strong>Stock:</strong> {selectedProduct.inStock}</p>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={editedProduct.title}
                  onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={editedProduct.brand}
                  onChange={(e) => setEditedProduct({ ...editedProduct, brand: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={editedProduct.category}
                  onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={editedProduct.salesPrice}
                  onChange={(e) => setEditedProduct({ ...editedProduct, salesPrice: e.target.value })}
                />
                </div>
              <div className="mb-4">
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={editedProduct.inStock}
                  onChange={(e) => setEditedProduct({ ...editedProduct, inStock: e.target.value })}
                />
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={editedProduct.imageUrl}
                  onChange={(e) => setEditedProduct({ ...editedProduct, imageUrl: e.target.value })}
                />
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <ReactQuill
                  value={editedProduct.description}
                  onChange={(content) => setEditedProduct({ ...editedProduct, description: content })}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image'],
                      ['clean'],
                    ],
                  }}
                  className="h-40 mb-4"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;