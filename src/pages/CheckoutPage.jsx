import React, { useState, useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Helmet } from 'react-helmet';
import { FiShoppingCart, FiLock, FiTruck, FiAlertCircle } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const CheckoutPage = () => {
  const location = useLocation();
  const { cartItems = [], subtotal, shippingFee, taxAmount, discount, discountAmount, total } = location.state || {};
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [shippingMethod, setShippingMethod] = useState('Standard');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth'))?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/cart');
    }
  }, [location.state, navigate]);

  const validateFields = () => {
    if (!address || !country || !region || !postalCode || !shippingMethod) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Information',
        text: 'Please fill out all required fields before placing your order.',
        showConfirmButton: true
      });
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateFields()) return;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/create-order`,
        {
          products: cartItems.map(item => ({
            product: item._id,
            title: item.title,
            image: item.imageUrl,
            price: item.salesPrice,
            quantity: 1
          })),
          shippingAddress: {
            address: address,
            city: region,
            postalCode: postalCode,
            country: country
          },
          shippingMethod,
          amount: Math.round(total)
        }
      );

      const options = {
        key: `${import.meta.env.VITE_REACT_RAZORPAY_KEY}`,
        amount: total * 100,
        currency: "INR",
        name: "EtherShop",
        description: "Thank you for shopping with us",
        image: "https://i.postimg.cc/Wz01THQQ/pixelcut-export.jpg",
        order_id: data.orderId,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          const paymentDetails = {
            razorpayPaymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            razorpaySignature: razorpay_signature,
          };

          // Verify payment on the backend
          try {
            const result = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/orders/verify-payment`, paymentDetails);
            if (result.data.success) {
              Swal.fire({
                icon: 'success',
                title: 'Payment Successful',
                text: 'Thank you for shopping with us',
                showConfirmButton: false,
                timer: 3000
              });
              navigate('/order-confirmation', { state: { order: result.data.order } });


            } else {
              Swal.fire({
                icon: 'error',
                title: 'Payment Failed',
                text: 'Something went wrong. Please try again',
                showConfirmButton: false,
                timer: 3000
              });
            }
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Payment Verification Failed',
              text: 'Unable to verify payment. Please try again later.',
              showConfirmButton: false,
              timer: 3000
            });
          }
        },
        prefill: {
          name: `${auth?.fullName}`,
          email: auth?.email,
          contact: auth?.phoneNumber,
        },
        theme: {
          color: "#528FF0",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Order Creation Failed',
        text: 'Something went wrong. Please try again later.',
        showConfirmButton: false,
        timer: 3000
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>Checkout - EtherShop</title>
        <meta name="description" content="checkout page for EtherShop" />
      </Helmet>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Checkout Your Order</h1>
            <p className="text-xl text-gray-600">Complete your purchase with confidence</p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-7">
              {/* Cart Items */}
              <section aria-labelledby="cart-heading" className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 id="cart-heading" className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FiShoppingCart className="mr-2" /> Your Cart
                </h2>
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6 flex items-center">
                      <img src={item.imageUrl} alt={item.title} className="w-24 h-24 rounded-md object-cover" />
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">Qty: 1</p>
                        <p className="mt-1 text-lg font-semibold text-indigo-600">Rs. {item.salesPrice.toLocaleString()}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Shipping Information */}
              <section aria-labelledby="shipping-heading" className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 id="shipping-heading" className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FiTruck className="mr-2" /> Shipping Information
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                      <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="bg-gray-100 h-10 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl text-gray-500" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                      <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="bg-gray-100 h-10 px-5 text-gray-500 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" />
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                      <input type="email" name="email" id="email" autoComplete="email" className="bg-gray-100 h-10 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" />
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number</label>
                      <input type="tel" name="phone" id="phone" autoComplete="tel" className="bg-gray-100 h-10 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" />
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                      <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="bg-gray-100 h-10 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                      <CountryDropdown value={country} onChange={(val) => setCountry(val)} className="bg-gray-100 h-10 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region</label>
                      <RegionDropdown country={country} value={region} onChange={(val) => setRegion(val)} className="bg-gray-100 h-10 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" />
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">Postal code</label>
                      <input type="text" id="postal-code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="bg-gray-100 h-10 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl" />
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="shipping-method" className="block text-sm font-medium text-gray-700">Shipping Method</label>
                      <select id="shipping-method" value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)} className="bg-gray-100 h-10 px-5 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl">
                        <option value="Standard">Standard</option>
                        <option value="Express">Express</option>
                      </select>
                    </div>
                  </div>
                </form>
              </section>
            </div>

            <div className="lg:col-span-5">
              {/* Summary Section */}
              <section aria-labelledby="summary-heading" className="bg-white rounded-lg shadow-lg p-6">
                <h2 id="summary-heading" className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FiLock className="mr-2" /> Order Summary
                </h2>
                <ul className="space-y-6">
                  <li className="flex justify-between">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Shipping Fee:</span>
                    <span className="text-gray-900">Rs. {shippingFee.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Tax:</span>
                    <span className="text-gray-900">Rs. {taxAmount.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Discount:</span>
                    <span className="text-gray-900">Rs. {discountAmount.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700 font-bold">Total:</span>
                    <span className="text-gray-900 font-bold">Rs. {total.toLocaleString()}</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={handlePayment}
                    className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold text-lg rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
