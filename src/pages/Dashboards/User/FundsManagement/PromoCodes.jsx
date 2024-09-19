import React, { useState, useEffect } from 'react';
import { Tag, X, Info, CheckCircle, AlertTriangle } from 'lucide-react';

const PromoCodes = () => {
  const [promoCode, setPromoCode] = useState('');
  const [availableCodes, setAvailableCodes] = useState([]);
  const [appliedCodes, setAppliedCodes] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchedCodes = [
      { code: 'SUMMER10', discount: '10% off', expiryDate: '2024-09-30' },
      { code: 'FREESHIP', discount: 'Free shipping', expiryDate: '2024-12-31' },
      { code: 'NEWUSER20', discount: '₹200 off', expiryDate: '2024-10-15' },
    ];
    setAvailableCodes(fetchedCodes);
  }, []);

  const applyPromoCode = () => {
    setError('');
    setSuccess('');
    
    const codeToApply = availableCodes.find(code => code.code === promoCode.toUpperCase());
    
    if (!codeToApply) {
      setError('Invalid promo code. Please check and try again.');
      return;
    }
    
    if (appliedCodes.some(code => code.code === codeToApply.code)) {
      setError('This promo code has already been applied.');
      return;
    }
    
    setAppliedCodes([...appliedCodes, codeToApply]);
    setSuccess('Promo code applied successfully!');
    setPromoCode('');
  };

  const removePromoCode = (codeToRemove) => {
    setAppliedCodes(appliedCodes.filter(code => code.code !== codeToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Promo Codes</h1>
        
        {/* Promo Code Input */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Apply a Promo Code</h2>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="promo-code"
                id="promo-code"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={applyPromoCode}
              >
                Apply
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                <AlertTriangle className="h-5 w-5 text-red-500 inline mr-1" />
                {error}
              </p>
            )}
            {success && (
              <p className="mt-2 text-sm text-green-600" id="email-success">
                <CheckCircle className="h-5 w-5 text-green-500 inline mr-1" />
                {success}
              </p>
            )}
          </div>
        </div>

        {/* Applied Promo Codes */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Applied Promo Codes</h2>
            {appliedCodes.length === 0 ? (
              <p className="text-gray-500">No promo codes applied yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {appliedCodes.map((code) => (
                  <li key={code.code} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Tag className="h-5 w-5 text-indigo-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{code.code}</p>
                        <p className="text-sm text-gray-500">{code.discount}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-4 text-sm font-medium text-red-600 hover:text-red-500"
                      onClick={() => removePromoCode(code.code)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Available Promo Codes */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Available Promo Codes</h2>
            <ul className="divide-y divide-gray-200">
              {availableCodes.map((code) => (
                <li key={code.code} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Tag className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{code.code}</p>
                        <p className="text-sm text-gray-500">{code.discount}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Expires: {new Date(code.expiryDate).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-indigo-50 rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-indigo-900 mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              How to Use Promo Codes
            </h2>
            <ol className="list-decimal list-inside text-sm text-indigo-800 space-y-2">
              <li>Enter the promo code in the input field above.</li>
              <li>Click the "Apply" button to add the code to your account.</li>
              <li>If valid, the code will appear in the "Applied Promo Codes" section.</li>
              <li>The discount will be automatically applied to eligible items in your cart.</li>
              <li>You can remove applied codes at any time by clicking the remove button.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodes;