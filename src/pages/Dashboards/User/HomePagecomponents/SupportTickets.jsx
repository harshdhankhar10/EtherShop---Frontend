import React from 'react';
import { motion } from 'framer-motion';

const tickets = [
  { id: 1, subject: 'Payment Issue', status: 'Open', date: '2024-07-18' },
  { id: 2, subject: 'Product Inquiry', status: 'Closed', date: '2024-07-15' },
];

function SupportTickets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Support Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id} className="mb-3 pb-3 border-b last:border-b-0">
            <p className="font-medium">{ticket.subject}</p>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Status: {ticket.status}</span>
              <span>{ticket.date}</span>
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        Create New Ticket
      </button>
    </motion.div>
  );
}

export default SupportTickets;