import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';

const AdminPrivateRoutes = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/admin-auth`)
        
        if (res.data.ok) {
          setOk(true);
          setAuth((prevAuth) => ({
            ...prevAuth,
            user: res.data.user,
          }));
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error('Failed to check admin authentication', error);
        setOk(false);
      }
    };

    authCheck();
  }, [auth.token, setAuth]);

  return <>{ok ? <Outlet /> : <Spinner />}</>;
};

export default AdminPrivateRoutes;
