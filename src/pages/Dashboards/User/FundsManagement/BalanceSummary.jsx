import React, { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp, TrendingDown, Bell, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import axios from 'axios';

const BalanceSummary = () => {
  const [balance, setBalance] = useState(0);
  const [recentChanges, setRecentChanges] = useState([]);
  const [totalDeposits, setTotalDeposits] = useState(0);
  // const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // Fetch the total balance of the user
  useEffect(() => {
    const fetchTotalBalance = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/funds/my-balance`);
        setBalance(response.data.totalBalance);
        setTotalDeposits(response.data.totalDeposits);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchTotalBalance();
  }, []);

  // Fetch total deposits, withdrawals, and recent changes
  useEffect(() => {
    const fetchAllUserBalances = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/funds/my-all-balances`);
        const { totalDeposits, recentChanges } = response.data.balance;
        setTotalDeposits(0);
        setRecentChanges("No changes");
      } catch (error) {
        console.error('Error fetching all user balances:', error);
      }
    };

    fetchAllUserBalances();
  }, []);
  

  // Set notifications (replace with API call if necessary)
  useEffect(() => {
    setNotifications([
      { id: 1, message: 'Your account balance is below ₹10,000. Consider adding funds.', type: 'warning' },
      { id: 2, message: 'New offer: Get 2% cashback on all deposits this week!', type: 'info' },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Balance Summary</h1>
        
        {/* Current Balance */}
        <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Current Balance
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  ₹{balance.toLocaleString('en-IN')}
                </dd>
              </div>
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <IndianRupee className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Changes and Summary */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-8">
          {/* Recent Changes */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Balance Changes</h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {/* {recentChanges.map((change, changeIdx) => (
                    <li key={changeIdx}>
                      <div className="relative pb-8">
                        {changeIdx !== recentChanges.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${change.type === 'deposit' ? 'bg-green-500' : 'bg-red-500'}`}>
                              {change.type === 'deposit' ? <ArrowUpRight className="h-5 w-5 text-white" aria-hidden="true" /> : <ArrowDownRight className="h-5 w-5 text-white" aria-hidden="true" />}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {change.type === 'deposit' ? 'Deposit' : 'Withdrawal'} of <span className="font-medium text-gray-900">₹{change.amount.toLocaleString('en-IN')}</span>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={change.date}>{new Date(change.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))} */}
                  <p className="text-sm text-gray-500">No Recent Changes</p>
                </ul>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Summary</h3>
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Deposits</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">₹{totalDeposits.toLocaleString('en-IN')}</dd>
                  <dd className="mt-2 flex items-center text-sm text-green-600">
                    <TrendingUp className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                    <span className="ml-2">Inflow</span>
                  </dd>
                </div>
                <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Withdrawals</dt>
                  <dd className="mt-1 text-xl font-semibold text-gray-900">Updating soon</dd>
                  <dd className="mt-2 flex items-center text-sm text-red-600">
                    <TrendingDown className="self-center flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />
                    <span className="ml-2">Outflow</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Notifications</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {notifications.map((notification, notificationIdx) => (
                  <li key={notification.id}>
                    <div className="relative pb-8">
                      {notificationIdx !== notifications.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}>
                            <Bell className="h-5 w-5 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">{notification.message}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BalanceSummary;
