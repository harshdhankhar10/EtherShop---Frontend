import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from "./pages/Routes";
import OfflinePage from './OfflinePage';
import MaintenancePage from './pages/MaintainancePage'; 
import axios from 'axios';

const useOnlineStatusAndMaintenance = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [maintenanceStatus, setMaintenanceStatus] = useState('INACTIVE');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')) || null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/maintainance/status`);
        setMaintenanceStatus(response.data.status[0].status);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, maintenanceStatus, user };
};

const App = () => {
  const { isOnline, maintenanceStatus, user } = useOnlineStatusAndMaintenance();

  const isAdmin = user && user.user && user.user.role === 'admin';

  if (maintenanceStatus === 'Active' && !isAdmin) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {isOnline ? (
        <>
          <Routes />
          <ToastContainer />
        </>
      ) : (
        <OfflinePage />
      )}
    </div>
  );
};

export default App;
