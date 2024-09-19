import React, { useState, useEffect } from 'react';
import { Search, ArrowUpRight, ArrowDownRight, Filter, X } from 'lucide-react';
import axios from 'axios';

const transactionTypes = ['All', 'Deposit', 'Withdrawal', 'Transfer'];
const transactionStatuses = ['All', 'Completed', 'Pending', 'Failed'];

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/funds/my-all-balances`);
      setTransactions(response.data.funds);
    }
    fetchTransactions();
  }, []);

  useEffect(() => {
    const results = transactions.filter(transaction =>
      (typeFilter === 'All' || transaction.type === typeFilter) &&
      (statusFilter === 'All' || transaction.status === statusFilter) &&
      (transaction._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
       transaction.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
       transaction.amount.toString().includes(searchTerm))
    );
    setFilteredTransactions(results);
  }, [searchTerm, typeFilter, statusFilter, transactions]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'Deposit':
        return <ArrowUpRight className="h-6 w-6 text-green-500" />;
      case 'Withdrawal':
        return <ArrowDownRight className="h-6 w-6 text-red-500" />;
      default:
        return <ArrowUpRight className="h-6 w-6 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Transaction History</h1>
            
            {/* Search and Filter */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>

            {/* Filter options */}
            {isFilterOpen && (
              <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction Type
                  </label>
                  <select
                    id="typeFilter"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    {transactionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="statusFilter"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {transactionStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Transaction List */}
            <div className="space-y-6">
              {filteredTransactions.map((transaction) => (
                <div key={transaction._id} className="bg-gray-50 rounded-lg p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getTransactionIcon("Deposit")}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">Deposit</p>
                      <p className="text-sm text-gray-500">Pay_ID: {transaction.transactionId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{transaction.amount.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                  </div>
                  <div className="ml-4">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Result count */}
            <div className="mt-8 text-sm text-gray-500">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;