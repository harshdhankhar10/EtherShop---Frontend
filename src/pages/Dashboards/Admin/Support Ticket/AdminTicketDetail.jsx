import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaTag, FaList, FaExclamationCircle, FaClock } from 'react-icons/fa';

const AdminTicketDetail = () => {
  const [ticket, setTicket] = useState(null);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('auth')).user);
  const { id } = useParams();

  const fetchTicket = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/support-tickets/get-ticket/${id}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('auth')).token
        }
      });
      setTicket(response.data.data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      setError('Failed to load ticket. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/support-tickets/add-response/${id}`, 
        { response, respondedBy : userDetails.id },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('auth')).token
          }
        }
      );
      fetchTicket();
      setResponse('');
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('Failed to submit response. Please try again.');
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
     const response =  await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/support-tickets/change-status/${id}`, 
        { status: newStatus },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('auth')).token
          }
        }
      );
      if(response.data.success){
        alert('Status updated successfully');
      }
      fetchTicket();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>;
  if (!ticket) return <div className="text-center text-gray-600">Ticket not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Ticket Details</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <FaTag className="text-gray-500 mr-2" />
              <span className="font-semibold">Ticket ID:</span> {ticket.ticketID}
            </div>
            <div className="flex items-center">
              <FaUser className="text-gray-500 mr-2" />
              <span className="font-semibold">User:</span> {ticket.userName}
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-gray-500 mr-2" />
              <span className="font-semibold">Email:</span> {ticket.email}
            </div>
            <div className="flex items-center">
              <FaList className="text-gray-500 mr-2" />
              <span className="font-semibold">Category:</span> {ticket.category}
            </div>
            <div className="flex items-center">
              <FaExclamationCircle className="text-gray-500 mr-2" />
              <span className="font-semibold">Priority:</span> 
              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                ticket.priority === 'High' ? 'bg-red-100 text-red-800' : 
                ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {ticket.priority}
              </span>
            </div>
            <div className="flex items-center">
              <FaClock className="text-gray-500 mr-2" />
              <span className="font-semibold">Status:</span> 
              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                ticket.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {ticket.status}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Subject</h3>
            <p className="mt-1 text-gray-600">{ticket.subject}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="mt-1 text-gray-600">{ticket.description}</p>
          </div>
          <div className="mt-6 flex space-x-2">
            <button 
              onClick={() => handleStatusUpdate('Open')} 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Mark Open
            </button>
            <button 
              onClick={() => handleStatusUpdate('Closed')} 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Mark Closed
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b">
          <h3 className="text-xl font-bold text-gray-800">Responses</h3>
        </div>
        <div className="p-6">
          {ticket.responses && ticket.responses.length > 0 ? (
            ticket.responses.map((response, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700">{response.response}</p>
                <small className="text-gray-500">Responded at: {new Date(response.respondedAt).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No responses yet.</p>
          )}
          <form onSubmit={handleResponseSubmit} className="mt-6">
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              required
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              rows="4"
              placeholder="Type your response here..."
            ></textarea>
            <button 
              type="submit" 
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Response
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketDetail;