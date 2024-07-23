import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketStatistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/support-tickets/stats`,{
          headers: {
            Authorization: JSON.parse(localStorage.getItem('auth')).token
          }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="ticket-statistics">
      <h2>Ticket Statistics</h2>
      <div>
        <strong>Total Tickets:</strong> {stats.totalTickets}
      </div>
      <div>
        <strong>Open Tickets:</strong> {stats.openTickets}
      </div>
      <div>
        <strong>Closed Tickets:</strong> {stats.closedTickets}
      </div>
      <div>
        <strong>High Priority Tickets:</strong> {stats.highPriorityTickets}
      </div>
      <div>
        <strong>Average Response Time:</strong> {stats.averageResponseTime} hours
      </div>
    </div>
  );
};

export default TicketStatistics;