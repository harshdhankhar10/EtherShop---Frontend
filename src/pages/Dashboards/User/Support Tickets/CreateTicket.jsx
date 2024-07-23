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
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Create New Support Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              <FiUser className="inline mr-2" />Full Name
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              <FiMail className="inline mr-2" />Email
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
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            <FiTag className="inline mr-2" />Subject
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            <FiMessageSquare className="inline mr-2" />Description
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
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              <FiFlag className="inline mr-2" />Priority
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
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              <FiFolder className="inline mr-2" />Category
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
        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <FiSend className="mr-2" /> Submit Ticket
          </button>
          <p className="text-sm text-gray-500 flex items-center">
            <FiAlertCircle className="mr-1" /> All fields are required
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;