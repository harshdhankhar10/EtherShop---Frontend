import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IndianRupee, Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddFunds = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [balance, setBalance] = useState(0);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')).user);

  useEffect(() => {
    // Fetch user's current balance
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/funds/my-balance`);
        setBalance(response.data.totalBalance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentSuccess = async (response) => {
    try {
      const result = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/funds/capture-payment`, {
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature,
        amount,
      });

      if (result.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: `₹${amount} has been added to your wallet.`,
          confirmButtonColor: '#3085d6',
        });
        setBalance(prevBalance => prevBalance + parseFloat(amount));
        setAmount('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'There was an issue processing your payment. Please try again.',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: 'An unexpected error occurred. Please try again later.',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handlePaymentFailure = () => {
    Swal.fire({
      icon: 'error',
      title: 'Payment Failed',
      text: 'The payment process was cancelled or failed. Please try again.',
      confirmButtonColor: '#d33',
    });
  };

  const openRazorpayPayment = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Amount',
        text: 'Please enter a valid amount greater than 0.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      Swal.fire({
        icon: 'error',
        title: 'Razorpay SDK Failed',
        text: 'Are you online? Unable to load Razorpay SDK.',
        confirmButtonColor: '#d33',
      });
      return;
    }

    try {
      const result = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/funds/create-order`, {
        amount,
        currency,
        receipt: `Receipt#${Math.floor(Math.random() * 1000000)}`,
      });

      const { amount: orderAmount, currency: orderCurrency, orderId } = result.data;

      const options = {
        key: import.meta.env.VITE_REACT_RAZORPAY_KEY,
        amount: orderAmount,
        currency: orderCurrency,
        name: 'EtherShop',
        description: 'Add Funds to Wallet',
        order_id: orderId,
        handler: handlePaymentSuccess,
        prefill: {
          name: auth.fullName,
          email: auth.email,
          userID: auth.id,
        },
        theme: {
          color: '#6366f1',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', handlePaymentFailure);
      paymentObject.open();
    } catch (error) {
      console.error('Error while creating Razorpay order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Payment Initiation Failed',
        text: 'There was an error initiating the payment. Please try again later.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Wallet Dashboard</h2>
            
            <div className="bg-indigo-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-600">Current Balance</p>
                  <p className="text-3xl font-bold text-indigo-900">₹{balance.toFixed(2)}</p>
                </div>
                <div className="bg-indigo-100 rounded-full p-3">
                  <IndianRupee className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                <h2 className="text-xl font-bold mb-4">Add Funds</h2>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                 
                  <input
          type="number"
          placeholder="Enter amount"
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                      Currency
                    </label>
                    <select
          value={currency}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="INR">INR</option>
        </select>
                  </div>
                </div>
              </div>

              <button
                onClick={openRazorpayPayment}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Funds
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFunds;