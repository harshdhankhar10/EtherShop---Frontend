import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiSend, FiAlertCircle } from 'react-icons/fi';

const CreateTicket = () => {
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('auth')).user);
  const [ticketData, setTicketData] = useState({
    user: userDetails.id,
    email : userDetails.email,
    userName : userDetails.fullName,
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
      setTicketData({ subject: '', description: '', priority: 'Medium', category: 'General' });
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Failed to create ticket. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create New Support Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={ticketData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the subject of your ticket"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={ticketData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Provide details about your issue"
          ></textarea>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={ticketData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={ticketData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="General">General</option>
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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