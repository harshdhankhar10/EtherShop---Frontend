import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format, isAfter } from 'date-fns';
import { FiRefreshCw, FiTrash2, FiEdit2, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import swal from 'sweetalert2';

const AllCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/coupon/get`);
      setCoupons(response.data.coupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      toast.error('Failed to fetch coupons');
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (id) => {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this coupon!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/coupon/delete/${id}`);
            if (response.data.success) {
              toast.success('Coupon deleted successfully');
              fetchCoupons();
            }
          } catch (error) {
            console.error('Error deleting coupon:', error);
            toast.error('Failed to delete coupon');
          }
        }
      });
  };

  const updateCoupon = async (id) => {
    swal.fire({
      title: 'Update Coupon',
      html: `
        <input id="name" class="swal2-input" placeholder="Coupon Name" value="${coupons.find((coupon) => coupon._id === id).name}">
        <input id="expiry" class="swal2-input" placeholder="Expiry Date" value="${format(new Date(coupons.find((coupon) => coupon._id === id).expiry), 'yyyy-MM-dd')}">
        <input id="discount" class="swal2-input" placeholder="Discount" value="${coupons.find((coupon) => coupon._id === id).discount}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: () => {
        const name = document.getElementById('name').value;
        const expiry = document.getElementById('expiry').value;
        const discount = document.getElementById('discount').value;
        return axios.put(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/coupon/update/${id}`,
          { name, expiry, discount },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem('auth')).token,
            },
          }
        );
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value.data.success) {
          toast.success('Coupon updated successfully');
          fetchCoupons();
        } else {
          toast.error('Failed to update coupon');
        }
      }
    });
  };
  


  const filteredCoupons = coupons.filter((coupon) =>
    coupon.name.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedCoupons = [...filteredCoupons].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Coupon Management</h1>
        
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
              <input
                type="text"
                placeholder="Filter coupons..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition duration-300"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <button
              onClick={fetchCoupons}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
            >
              <FiRefreshCw className="mr-2" />
              Refresh Coupons
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : sortedCoupons.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Name', 'Discount', 'Expiry Status', 'Expiry'].map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort(header.toLowerCase())}
                      >
                        <div className="flex items-center">
                          {header}
                          {sortBy === header.toLowerCase() && (
                            sortOrder === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
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
                  {sortedCoupons.map((coupon) => (
                    <tr key={coupon._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{coupon.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-semibold">{coupon.discount}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          isAfter(new Date(coupon.expiry), new Date())
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {isAfter(new Date(coupon.expiry), new Date()) ? 'Active' : 'Expired'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{format(new Date(coupon.expiry), 'MMM dd, yyyy')}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => deleteCoupon(coupon._id)}
                          className="text-red-600 hover:text-red-900 mr-4 transition duration-150 ease-in-out"
                        >
                          <FiTrash2 className="inline-block mr-1" /> Delete
                        </button>
                        <button onClick={()=> updateCoupon(coupon._id)} className="text-blue-600 hover:text-blue-900 transition duration-150 ease-in-out">
                          <FiEdit2 className="inline-block mr-1" /> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-4">No coupons found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCoupons;