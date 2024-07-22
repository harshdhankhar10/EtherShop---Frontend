import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEye, FiEdit, FiTrash2, FiSearch, FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error fetching products');
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
    setIsEditModalOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/delete/${selectedProduct._id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error deleting product');
    }
    setIsDeleteModalOpen(false);
  };

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
         <Link to="/dashboard/admin/product/create" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
            <FiPlus className="mr-2" /> Add Product
          </Link>
        </div>
        
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="w-full sm:w-48 pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
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
                          <button onClick={() => handleView(product)} className="text-blue-600 hover:text-blue-900">
                            <FiEye className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleEdit(product)} className="text-yellow-600 hover:text-yellow-900">
                            <FiEdit className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleDelete(product)} className="text-red-600 hover:text-red-900">
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
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            {/* Add form fields for editing product details */}
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete {selectedProduct.title}?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;