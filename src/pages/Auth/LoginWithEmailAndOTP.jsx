import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginWithEmailAndOTP = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/send-otp`, { email });
      if (data.success) {
        toast.success('OTP sent to your email!');
        setOtpSent(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to send OTP',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error sending OTP',
        text: 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitOtp = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/login-otp`, { email, otp });
      if (data.success) {
        toast.success('Logged in successfully!');
        setAuth({ ...auth, user: data.user, token: data.token });
        localStorage.setItem('auth', JSON.stringify(data));
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid OTP. Please try again.',
      });
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Login with OTP - Ecommerce</title>
        <meta name="description" content="Login to your account using OTP" />
      </Helmet>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <h1 className="text-2xl xl:text-3xl font-bold text-center text-gray-500">Sign In with OTP</h1>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <button
                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                  {otpSent && (
                    <div
                      className="mt-5 transition-opacity duration-500 ease-in-out"
                      style={{ opacity: otpSent ? 1 : 0 }}
                    >
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                      />
                      <button
                        className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        onClick={handleSubmitOtp}
                      >
                        Verify OTP
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
              <img src="https://static.vecteezy.com/system/resources/previews/027/205/841/original/login-and-password-concept-3d-illustration-computer-and-account-login-and-password-form-page-on-screen-3d-illustration-png.png" className="h-full w-full" alt="Login illustration" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginWithEmailAndOTP;