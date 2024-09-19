import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiRefreshCw, FiMail, FiClock } from 'react-icons/fi';
import Swal from 'sweetalert2';

const MaintenanceModePage = () => {
  const [maintenanceStatus, setMaintenanceStatus] = useState('INACTIVE');
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scheduledTime, setScheduledTime] = useState('');

  useEffect(() => {
    fetchMaintenanceStatus();
  }, []);

  const fetchMaintenanceStatus = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/maintainance/status`);
      const status = response.data.status[0].status;
      setMaintenanceStatus(status);
      setIsMaintenanceMode(status === 'Active');
      setScheduledTime(response.data.status[0].scheduledTime || '');
    } catch (error) {
      console.log(error);
      setError('Failed to fetch maintenance status.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMaintenanceMode = async () => {
    try {
      const result = await Swal.fire({
        title: `${isMaintenanceMode ? 'Disable' : 'Enable'} Maintenance Mode?`,
        text: `Are you sure you want to ${isMaintenanceMode ? 'disable' : 'enable'} maintenance mode?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4F46E5',
        cancelButtonColor: '#EF4444',
        confirmButtonText: 'Yes, do it!',
      });

      if (result.isConfirmed) {
        setIsMaintenanceMode(!isMaintenanceMode);
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/maintainance/setMaintainanceMode`, {
          status: isMaintenanceMode ? 'Inactive' : 'Active',
        });

        setMaintenanceStatus(response.data.status);
        setIsMaintenanceMode(response.data.status === 'Active');

        Swal.fire(
          'Success!',
          `Maintenance mode has been ${isMaintenanceMode ? 'disabled' : 'enabled'}.`,
          'success'
        );
        window.location.reload();
      }
    } catch (err) {
      setIsMaintenanceMode(isMaintenanceMode);
      Swal.fire('Error!', 'Failed to toggle maintenance mode. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMailToUsers = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: 'Send Maintenance Mail',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Estimated Duration (e.g., 2 hours)" type="text">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Additional Information (optional)" type="text">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Send Mail',
        preConfirm: () => {
          const estimatedDuration = document.getElementById('swal-input1').value;
          const additionalInfo = document.getElementById('swal-input2').value;
          if (!estimatedDuration) {
            Swal.showValidationMessage('Please enter the estimated duration.');
            return false;
          }
          return { estimatedDuration, additionalInfo };
        },
      });

      if (formValues) {
        setIsLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/mail/maintenance-mode`,
          {maintenanceStatus,            
            estimatedDuration: formValues.estimatedDuration,
            additionalInfo: formValues.additionalInfo,

          }
        );

        if (response.data.success) {
          Swal.fire('Success!', 'Mail has been sent to all users.', 'success');
        } else {
          Swal.fire('Error!', 'Failed to send mail to users. Please try again.', 'error');
        }
      }
    } catch (err) {
      Swal.fire('Error!', 'Failed to send mail to users. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const scheduleMaintenanceMode = async () => {
    try {
      const result = await Swal.fire({
        title: 'Schedule Maintenance',
        html: `
          <input id="swal-input1" class="swal2-input" type="datetime-local">
        `,
        focusConfirm: false,
        preConfirm: () => {
          return document.getElementById('swal-input1').value;
        },
      });

      if (result.value) {
        const scheduledTime = result.value;
        await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/schedule-maintenance`, { scheduledTime });
        setScheduledTime(scheduledTime);
        Swal.fire('Success!', 'Maintenance mode has been scheduled.', 'success');
      }
    } catch (err) {
      Swal.fire('Error!', 'Failed to schedule maintenance mode. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full"
      >
        <h1 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <FiAlertTriangle className="mr-2" />
          Maintenance Mode Control Panel
        </h1>

        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-40"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <FiRefreshCw className="text-4xl text-indigo-600" />
              </motion.div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
              role="alert"
            >
              <p>{error}</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-indigo-100 rounded-xl p-6 shadow-md">
                  <h2 className="text-xl font-semibold text-indigo-800 mb-4">Current Status</h2>
                  <div className={`text-lg font-medium ${isMaintenanceMode ? 'text-red-600' : 'text-green-600'}`}>
                    {isMaintenanceMode ? 'Maintenance Mode Active' : 'Maintenance Mode Inactive'}
                  </div>
                  {scheduledTime && (
                    <div className="mt-2 text-sm text-indigo-600">
                      <FiClock className="inline mr-1" />
                      Scheduled: {new Date(scheduledTime).toLocaleString()}
                    </div>
                  )}
                </div>
                <div className="bg-purple-100 rounded-xl p-6 shadow-md">
                  <h2 className="text-xl font-semibold text-purple-800 mb-4">Quick Actions</h2>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={toggleMaintenanceMode}
                      className={`px-4 py-2 rounded-md text-white font-medium transition duration-300 ease-in-out ${
                        isMaintenanceMode ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {isMaintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
                    </button>
                    <button
                      onClick={sendMailToUsers}
                      className="px-4 py-2 rounded-md bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition duration-300 ease-in-out flex items-center justify-center"
                    >
                      <FiMail className="mr-2" />
                      Send Mail to Users
                    </button>
                    <button
                      onClick={scheduleMaintenanceMode}
                      className="px-4 py-2 rounded-md bg-purple-500 text-white font-medium hover:bg-purple-600 transition duration-300 ease-in-out flex items-center justify-center"
                    >
                      <FiClock className="mr-2" />
                      Schedule Maintenance
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MaintenanceModePage;
