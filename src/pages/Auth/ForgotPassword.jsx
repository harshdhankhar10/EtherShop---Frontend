import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { Helmet } from "react-helmet"
import axios from 'axios';
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/mail/request-reset-password`, {
        email
      });
  
      if (res.data.success) {
        toast.success("Please check your email for password reset instructions");
        setEmail('');
        
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Failed to send mail', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Forgot Password - Ecommerce</title>
        <meta name="description" content="Reset your Ecommerce account password" />
      </Helmet>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <h1 className="text-2xl xl:text-3xl font-bold text-center text-gray-500">Forgot Password</h1>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit}>
                    <input 
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="Email" 
                      required 
                      aria-label="Email address"
                    />
                    <button 
                      className={`mt-5 tracking-wide font-semibold ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-400 hover:bg-green-700'} text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`} 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
                          <path d="M4 12a8 8 0 018-8v0a8 8 0 010 16v0a8 8 0 01-8-8" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                      )}
                      <span className="ml-3">{loading ? 'Processing...' : 'Reset Password'}</span>
                    </button>
                  </form>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Please provide your email, an email will be sent to you to reset your password.
                  </p>
                  <div className="mt-6 text-center">
                    <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                      Back to Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
              <img src='https://static.vecteezy.com/system/resources/previews/027/205/841/original/login-and-password-concept-3d-illustration-computer-and-account-login-and-password-form-page-on-screen-3d-illustration-png.png' className='h-full w-full' alt="Forgot Password illustration" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
