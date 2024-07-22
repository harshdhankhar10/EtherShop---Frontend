import React, { useState } from 'react'
import Navbar from './Navbar'
import { Helmet } from 'react-helmet'
import { FaTrash, FaMinus, FaPlus, FaArrowRight, FaGift, FaShoppingCart } from 'react-icons/fa'

const CartItem = ({ id, name, image, price, quantity, onRemove, onQuantityChange }) => (
  <div className="flex items-center space-x-4 py-6 border-b border-gray-100 last:border-b-0">
    <img src={image} alt={name} className="w-24 h-24 object-cover rounded-xl shadow-md" />
    <div className="flex-grow">
      <h3 className="text-lg font-bold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500 mt-1">Unit Price: ${price.toFixed(2)}</p>
      <div className="flex items-center mt-2 space-x-2">
        <button 
          onClick={() => onQuantityChange(id, quantity - 1)}
          className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition duration-300"
        >
          <FaMinus size={12} />
        </button>
        <span className="text-gray-700 font-semibold">{quantity}</span>
        <button 
          onClick={() => onQuantityChange(id, quantity + 1)}
          className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition duration-300"
        >
          <FaPlus size={12} />
        </button>
      </div>
    </div>
    <div className="text-right">
      <p className="text-lg font-bold text-gray-800">${(price * quantity).toFixed(2)}</p>
      <button 
        onClick={() => onRemove(id)}
        className="mt-2 text-red-500 hover:text-red-700 transition duration-300"
      >
        <FaTrash size={16} />
      </button>
    </div>
  </div>
)

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <FaShoppingCart size={64} className="text-gray-300 mb-4" />
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
    <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
    <button className="bg-blue-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:bg-blue-700 transition duration-300">
      Start Shopping
    </button>
  </div>
)

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Premium Wireless Headphones", image: "https://example.com/headphones.jpg", price: 199.99, quantity: 1 },
    { id: 2, name: "Ergonomic Office Chair", image: "https://example.com/chair.jpg", price: 299.99, quantity: 2 },
    { id: 3, name: "Smart Fitness Watch", image: "https://example.com/watch.jpg", price: 149.99, quantity: 1 },
  ])

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const changeQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ))
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = cartItems.length > 0 ? 10 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
   <>
   <Helmet>
    <title>Shopping Cart - EtherShop</title>
   </Helmet>
    <Navbar/>
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12">
      <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Your Cart</h1>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {cartItems.length > 0 ? (
            <div className="md:flex gap-16">
              <div className="md:w-2/3 p-8">
                <div className="space-y-6">
                  {cartItems.map(item => (
                    <CartItem 
                      key={item.id} 
                      {...item} 
                      onRemove={removeItem}
                      onQuantityChange={changeQuantity}
                    />
                  ))}
                </div>
              </div>
              <div className="md:w-1/3 bg-gray-50 p-8">
                <div className="mt-8 mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <FaGift className="text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-700">Have a coupon?</h3>
                  </div>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Enter coupon code" 
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-r-xl font-semibold hover:bg-gray-300 transition duration-300">
                      Apply
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-lg font-bold text-gray-800">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-bold text-lg mt-8 hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2">
                  <span>Proceed to Checkout</span>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>
    </div>
   </>
  )
}

export default Cart