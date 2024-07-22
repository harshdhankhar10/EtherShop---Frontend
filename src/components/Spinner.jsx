import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = () => {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(interval);
          navigate('/login', { state: { from: location.pathname } });
          return prevCount;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, location]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="w-32 h-32 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
        <div className="w-32 h-32 border-r-4 border-l-4 border-yellow-300 rounded-full animate-spin absolute top-0 left-0 animation-delay-150"></div>
        <div className="w-32 h-32 border-t-4 border-b-4 border-green-400 rounded-full animate-spin absolute top-0 left-0 animation-delay-300"></div>
        <div className="absolute top-0 left-0 w-32 h-32 flex items-center justify-center">
          <div className="font-bold text-xl">Loading</div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
