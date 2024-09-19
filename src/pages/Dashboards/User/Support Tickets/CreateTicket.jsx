import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiSend, FiAlertCircle, FiUser, FiMail, FiTag, FiMessageSquare, FiFlag, FiFolder } from 'react-icons/fi';

const CreateTicket = () => {
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('auth')).user);
  const [ticketData, setTicketData] = useState({
    user: userDetails.id,
    email: userDetails.email,
    userName: userDetails.fullName,
    subject: '',
    description: '',
    priority: 'Medium',
    category: 'General',
  });

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/support-tickets/create-ticket`, ticketData, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('auth')).token
        }
      });
      toast.success('Ticket created successfully!');
      setTicketData({ ...ticketData, subject: '', description: '', priority: 'Medium', category: 'General' });
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Failed to create ticket. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-500 to-indigo-600">
            <h2 className="text-3xl font-extrabold text-white">Create New Support Ticket</h2>
            <p className="mt-2 text-white text-opacity-80">We're here to help. Please provide the details of your issue.</p>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="userName" className=" text-sm font-medium text-gray-700 flex items-center">
                  <FiUser className="mr-2" />Full Name
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={ticketData.userName}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className=" text-sm font-medium text-gray-700 flex items-center">
                  <FiMail className="mr-2" />Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={ticketData.email}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className=" text-sm font-medium text-gray-700 flex items-center">
                <FiTag className="mr-2" />Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={ticketData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the subject of your ticket"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className=" text-sm font-medium text-gray-700 flex items-center">
                <FiMessageSquare className="mr-2" />Description
              </label>
              <textarea
                id="description"
                name="description"
                value={ticketData.description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide details about your issue"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="priority" className=" text-sm font-medium text-gray-700 flex items-center">
                  <FiFlag className="mr-2" />Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={ticketData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className=" text-sm font-medium text-gray-700 flex items-center">
                  <FiFolder className="mr-2" />Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={ticketData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="General">General</option>
                  <option value="Technical">Technical</option>
                  <option value="Billing">Billing</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                <FiSend className="mr-2" /> Submit Ticket
              </button>
              <p className="text-sm text-gray-500 flex items-center">
                <FiAlertCircle className="mr-1" /> All fields are required
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;