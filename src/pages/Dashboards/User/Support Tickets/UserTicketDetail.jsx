import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FiAlertCircle, FiClock, FiMessageCircle, FiUser, FiTag, FiFlag, FiFolder, FiCalendar } from 'react-icons/fi';

const UserTicketDetail = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/support-tickets/get-ticket/${id}`, {
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
      case 'open': return 'bg-blue-500 text-white';
      case 'in progress': return 'bg-yellow-500 text-white';
      case 'closed': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FiClock className="animate-spin text-6xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <FiAlertCircle className="text-5xl text-red-500 mb-4 mx-auto" />
          <p className="text-xl font-semibold text-gray-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{ticket.subject}</h2>
                <p className="mt-2 text-sm text-gray-500 flex items-center">
                  <FiTag className="mr-2" /> Ticket ID: {ticket.ticketID}
                </p>
              </div>
              <div className="flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FiUser className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{ticket.userName}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Created on: {new Date(ticket.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FiFolder className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Category: {ticket.category}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-sm text-gray-600">{ticket.description}</p>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-8 bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Responses</h3>
            {ticket.responses.length > 0 ? (
              <div className="space-y-6">
                {ticket.responses.map((response, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <FiMessageCircle className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm text-gray-800">{response.response}</p>
                        <p className="mt-2 text-xs text-gray-500">
                          Responded at: {new Date(response.respondedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <FiMessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 italic">No responses yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTicketDetail;