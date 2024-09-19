import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import swal from 'sweetalert2';
const MyProfile = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth')).user);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/profile/my-profile`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('auth')).token
          }
        });
        setUserDetails(response.data.myProfile);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIpAddress();
  }, []);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/profile/update-profile`, updatedData, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('auth')).token
        }
      });
      setUserDetails((prevDetails) => ({ ...prevDetails, ...updatedData }));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      swal.fire({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover your account!',  
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/delete/${user.id}`, {
            headers: {
              Authorization: JSON.parse(localStorage.getItem('auth')).token
            }
                    }).then(() => {
            swal.fire('Deleted!', 'Your account has been deleted.', 'success').then(() => {
              localStorage.removeItem('auth');
              window.location.href = '/login';

          
          });
          localStorage.removeItem('auth');
          window.location.href = '/login';
                });
          localStorage.removeItem('auth');
          window.location.href = '/login';
          toast.success('Account deleted successfully!');
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire('Cancelled', 'Your account is safe :)', 'error');
        }
      });
      
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Error deleting account');
    }
  };

  const handleVerifyEmail = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/send-verification-email`, null, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('auth')).token
        }
      });
      toast.success('Verification email sent. Please check your inbox.');
    } catch (error) {
      toast.error('Error sending verification email');
      console.error('Error sending verification email:', error);
    }
  };

  const renderTabContent = () => {
    function formatDOB(dob) {
      const date = new Date(dob);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${day}-${month}-${year}`;
    }  
    switch (activeTab) {
      case 'personal':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField label="Email" value={user.email} />
            <ProfileField label="Phone" value={userDetails.phoneNo} />
            <ProfileField label="Date of Birth" value={formatDOB(userDetails.dateOfBirth)} />
            <ProfileField label="Gender" value={userDetails.gender} />
            <ProfileField label="Member Since" value={formatDOB(userDetails.createdAt)} />
            <ProfileField label="IP Address" value={ipAddress || 'Loading...'} />
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-2">Address</h2>
              <p className="text-gray-700">{userDetails.address}</p>
            </div>
          </div>
        );
      case 'update':
        return <UpdateProfileForm user={userDetails} onUpdate={handleUpdateProfile} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">My Account</h2>
        </div>
        <nav className="mt-6">
          <NavItem
            title="Personal Info"
            icon="👤"
            active={activeTab === 'personal'}
            onClick={() => setActiveTab('personal')}
          />
          <NavItem
            title="Update Profile"
            icon="✏️"
            active={activeTab === 'update'}
            onClick={() => setActiveTab('update')}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 sm:p-10 sm:pb-8 flex flex-col sm:flex-row items-center justify-between">
              <div className="flex flex-col sm:flex-row items-center ">
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s'
                  alt={user.fullName}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4 sm:mb-0 sm:mr-6"
                />
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-white">{user.fullName}</h1>
                  <p className="text-indigo-100 text-lg">Role: {user.role}</p>
                </div>
               
              </div>

              {/* <button
                onClick={handleVerifyEmail}
                className="mt-4 sm:mt-0 px-4 py-2 bg-white text-indigo-600 rounded-md shadow hover:bg-indigo-50 transition-colors duration-200"
              >
                Verify Email
              </button> */}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {activeTab === 'personal' ? 'Personal Information' : 'Update Profile'}
            </h2>
            {renderTabContent()}
          </div>

          {/* Delete Account Button */}
          <div className="mt-8 text-right">
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition-colors duration-200"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div>
    <h2 className="text-sm font-medium text-gray-500">{label}</h2>
    <p className="mt-1 text-lg text-gray-900">{value}</p>
  </div>
);

const NavItem = ({ title, icon, active, onClick }) => (
  <button
    className={`w-full text-left px-6 py-3 flex items-center space-x-3 ${
      active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
    }`}
    onClick={onClick}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{title}</span>
  </button>
);

const UpdateProfileForm = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({ ...user });
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('auth')).user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={userDetails.fullName}
          disabled
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={userDetails.email}
          disabled
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNo"
          id="phoneNo"
          value={formData.phoneNo}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          name="address"
          id="address"
          rows="3"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default MyProfile;