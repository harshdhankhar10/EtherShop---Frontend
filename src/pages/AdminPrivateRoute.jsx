import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';

export default function AdminPrivateRoute() {
  const [loading, setLoading] = useState(true);
  const [auth, , authLoading] = useAuth(); // Retrieve auth and loading state from context
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      // Check if token is available and wait for authLoading to finish
      if (!auth?.token && !authLoading) {
        console.log("No token found, redirecting to login...");
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/admin-auth`, {
          headers: {
            Authorization: `${auth.token}`,
          },
        });
        setLoading(false); // Set loading to false after successful auth check

      }
       catch (error) {
        console.error('Error during admin authentication check:', error);
        setLoading(false); 
        navigate('/login'); // Redirect to login if not authenticated
      }
    };

    if (!authLoading) {
      authCheck();
    }
  }, [auth?.token, authLoading, navigate]);

  return loading || authLoading ? <Spinner /> : <Outlet />;
}
