import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';
import Spinner from "../components/Spinner";
import axios from 'axios'; 

const PrivateRoutes = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/user-auth`);
                if (res.data.ok) {
                    setOk(true);
                    setAuth(res.data.user);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error('Error during authentication check:', error);
                setOk(false);
            }
        };

        if(auth?.token) authCheck();
    }, [auth?.token]); 

    return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoutes;
