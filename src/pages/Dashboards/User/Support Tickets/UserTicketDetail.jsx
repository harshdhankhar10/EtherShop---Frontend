import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FiAlertCircle, FiClock, FiMessageCircle } from 'react-icons/fi';

const UserTicketDetail = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/support-tickets/get-ticket/${id}`,{
          headers: {
            Authorization: JSON.parse(localStorage.getItem('auth')).token
          }
        });
        setTicket(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ticket:', error);
        setError('Failed to load ticket details. Please try again later.');
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'text-blue-600 bg-blue-100';
      case 'in progress': return 'text-yellow-600 bg-yellow-100';
      case 'closed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FiClock className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <FiAlertCircle className="inline-block mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Ticket Details</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Ticket ID: {ticket.ticketID}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Created on: {new Date(ticket.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Subject</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ticket.subject}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ticket.description}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Priority</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ticket.category}</dd>
            </div>
          </dl>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Responses</h3>
      {ticket.responses.length > 0 ? (
        <div className="space-y-6">
          {ticket.responses.map((response, index) => (
            <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FiMessageCircle className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-full">
                    <p className="text-sm text-gray-900">{response.response}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      Responded at: {new Date(response.respondedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No responses yet.</p>
      )}
    </div>
  );
};

export default UserTicketDetail;