import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../redux/slices/cartSlice';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateCartItemQuantity({ id, quantity }));
  };

  const total = cartItems.reduce((acc, item) => acc + item.salesPrice * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-xl">Your cart is empty</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">₹ {item.salesPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 px-2 py-1 border rounded-md mr-4"
                />
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8 flex justify-between items-center">
            <span className="text-2xl font-bold">Total: ₹ {total.toFixed(2)}</span>
            <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-300">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;