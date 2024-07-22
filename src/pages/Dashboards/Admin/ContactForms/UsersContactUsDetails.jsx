import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiRefreshCcw, FiChevronDown, FiChevronUp, FiMail, FiEye, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

const UsersContactUsDetails = () => {
    const [contactForms, setContactForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [selectedForm, setSelectedForm] = useState(null);

    useEffect(() => {
        fetchContactForms();
    }, []);

    const fetchContactForms = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/contactForm/get`);
            setContactForms(response.data.contactForm);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleSort = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const sortedForms = [...contactForms].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredForms = sortedForms.filter(form =>
        Object.values(form).some(value => 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredForms.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const SortButton = ({ field, label }) => (
        <button 
            onClick={() => handleSort(field)}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 bg-white px-3 py-2 rounded-md shadow-sm transition duration-150 ease-in-out hover:bg-gray-50"
        >
            {label}
            {sortField === field && (
                sortOrder === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
            )}
        </button>
    );

    const Modal = ({ form, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Contact Form Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FiX size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <p><strong>Name:</strong> {form.name}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Order Number:</strong> {form.orderNumber}</p>
                    <p><strong>Subject:</strong> {form.subject}</p>
                    <p><strong>Message:</strong></p>
                    <p className="bg-gray-100 p-4 rounded-md">{form.message}</p>
                </div>
            </div>
        </div>
    );

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="text-center mt-10 text-red-500 bg-red-100 p-4 rounded">
            Error: {error}
        </div>
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Contact Us Data</h1>
                
                <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button
                        onClick={fetchContactForms}
                        className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center justify-center transition duration-150 ease-in-out"
                    >
                        <FiRefreshCcw className="mr-2" /> Refresh
                    </button>
                </div>

                <div className="mb-6 flex flex-wrap gap-4">
                    <SortButton field="name" label="Sort by Name" />
                    <SortButton field="email" label="Sort by Email" />
                    <SortButton field="subject" label="Sort by Subject" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentItems.map(form => (
                        <div key={form._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800">{form.name}</h2>
                                <p className="text-gray-600 mb-2">{form.email}</p>
                                <p className="text-sm text-gray-500 mb-2">Order: {form.orderNumber}</p>
                                <p className="font-medium mb-2 text-gray-700">{form.subject}</p>
                                <p className="text-gray-600 mb-4 line-clamp-3">{form.message}</p>
                                <div className="flex justify-end space-x-2">
                                   
                                    <button 
                                        onClick={() => setSelectedForm(form)}
                                        className="text-green-600 hover:text-green-800 flex items-center transition duration-150 ease-in-out"
                                    >
                                        <FiEye className="mr-1" /> View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedForm && <Modal form={selectedForm} onClose={() => setSelectedForm(null)} />}

                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredForms.length)}</span> of{' '}
                            <span className="font-medium">{filteredForms.length}</span> results
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 transition duration-150 ease-in-out"
                        >
                            <FiChevronLeft />
                        </button>
                        <span className="text-gray-600">Page {currentPage}</span>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLastItem >= filteredForms.length}
                            className="px-4 py-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 transition duration-150 ease-in-out"
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersContactUsDetails;