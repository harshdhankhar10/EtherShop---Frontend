import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiMail, FiUser, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const CustomerOverview = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/users/user-overview`
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Customer Overview</h2>

      {/* Scrollable container with a fixed height */}
      <div className="overflow-y-auto max-h-96 p-4  rounded-lg shadow-inner">
        {users.map((user) => (
          <div
            key={user._id}
            className="py-4 border-b border-gray-200 last:border-none"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{user.fullName}</h3>
              {user.status === 'active' ? (
                <FiCheckCircle className="text-green-500 text-xl" />
              ) : (
                <FiXCircle className="text-red-500 text-xl" />
              )}
            </div>

            <div className="mt-2 flex items-center text-gray-600">
              <FiMail className="mr-2" />
              <p className="text-sm">{user.email}</p>
            </div>

            <div className="mt-2 flex items-center text-gray-600">
              <FiUser className="mr-2" />
              <p className="text-sm">Role: {user.role}</p>
            </div>

            <div className="mt-2 text-sm text-gray-500">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOverview;
