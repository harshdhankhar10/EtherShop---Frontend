import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from "./pages/Routes";
import OfflinePage from './OfflinePage';

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  return isOnline;
};

const App = () => {
  const isOnline = useOnlineStatus();

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
