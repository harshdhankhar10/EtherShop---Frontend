import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { toast } from 'react-toastify';

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const { token } = useParams(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/mail/reset-password/${token}`, {
        newPassword,
      });

      if (res.data.success) {
        toast.success('Password reset successfully');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password - EtherShop</title>
        <meta name="description" content="Reset Password - EtherShop" />
      </Helmet>
      <Navbar />

      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || newPassword.length < 6}
            className={`w-full p-2 rounded ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default PasswordReset;
