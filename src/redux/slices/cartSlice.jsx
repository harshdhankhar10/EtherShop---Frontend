// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
}
const saveCartToLocalStorage = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage()
  },
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.items.find(item => item._id === action.payload._id);
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        saveCartToLocalStorage(state.items);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    updateCartItemQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.items.find(item => item._id === _id);
    
      if (item) {
        item.quantity = quantity;
        saveCartToLocalStorage(state.items);
      } else {
        console.error(`Item with id ${_id} not found`);
      }
    },
    setCart: (state, action) => {
      state.items = action.payload;
    }
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, setCart } = cartSlice.actions;

export default cartSlice.reducer;
