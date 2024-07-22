import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash, FaSort, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/all`);
            if (response.data.success) {
                setCategories(response.data.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setLoading(false);
            Swal.fire('Error!', 'Failed to fetch categories', 'error');
        }
    };

    const handleView = (category) => {
        setSelectedCategory(category);
        setShowModal(true);
    };

    const handleEdit = (category) => {
        Swal.fire({
            title: 'Edit Category',
            html:
                `<input id="swal-input1" class="swal2-input" value="${category.name}" placeholder="Category Name">` +
                `<textarea id="swal-input2" class="swal2-textarea" placeholder="Category Description">${category.description}</textarea>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-input1').value,
                    description: document.getElementById('swal-input2').value
                }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const updatedCategory = {
                        name: result.value.name,
                        description: result.value.description
                    };
                    await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/update/${category._id}`, updatedCategory);
                    Swal.fire('Saved!', 'The category has been updated.', 'success');
                    fetchCategories(); 
                } catch (error) {
                    Swal.fire('Error!', 'Failed to update category.', 'error');
                }
            }
        });
    };

    const handleDelete = async (categoryId) => {
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
            try {
                await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/delete/${categoryId}`);
                Swal.fire('Deleted!', 'The category has been deleted.', 'success');
                fetchCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
                Swal.fire('Error!', 'Failed to delete category.', 'error');
            }
        }
    };

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredCategories = categories
        .filter(category => 
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
            if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

    const pageCount = Math.ceil(filteredCategories.length / itemsPerPage);
    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen p-8">
            <Helmet>
                <title>All Categories</title>
            </Helmet>
            
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">All Categories</h1>
                    <div className="w-full md:w-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search categories..."
                                className="w-full md:w-96 px-4 py-2 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute right-3 top-3 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                                        Name <FaSort className="inline ml-1" />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedCategories.map((category) => (
                                    <tr key={category._id} className="hover:bg-gray-50 transition duration-300">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img src={category.image} alt={category.name} className="h-16 w-16 rounded-full object-cover border-2 border-gray-200 transition duration-300 transform hover:scale-110" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">{category.description.substring(0, 100)}...</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleView(category)} className="text-blue-500 hover:text-blue-600 mr-3 transition duration-300 transform hover:scale-110">
                                                <FaEye size={18} />
                                            </button>
                                            <button onClick={() => handleEdit(category)} className="text-yellow-500 hover:text-yellow-600 mr-3 transition duration-300 transform hover:scale-110">
                                                <FaEdit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(category._id)} className="text-red-500 hover:text-red-600 transition duration-300 transform hover:scale-110">
                                                <FaTrash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === pageCount}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredCategories.length)}</span> of{' '}
                                    <span className="font-medium">{filteredCategories.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    {Array.from({ length: pageCount }).map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                currentPage === index + 1
                                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === pageCount}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Next</span>
                                        <FaChevronRight className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && selectedCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
                        <h2 className="text-3xl font-bold mb-4">{selectedCategory.name}</h2>
                        <img src={selectedCategory.image} alt={selectedCategory.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                        <p className="text-gray-600 mb-4">{selectedCategory.description}</p>
                        <button onClick={() => setShowModal(false)} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllCategories;