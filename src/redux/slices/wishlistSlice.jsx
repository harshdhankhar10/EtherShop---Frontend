// wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromLocalStorage = () => {
  const savedWishlist = localStorage.getItem('wishlist');
  return savedWishlist ? JSON.parse(savedWishlist) : [];
};

const saveWishlistToLocalStorage = (items) => {
  localStorage.setItem('wishlist', JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlistFromLocalStorage(), 
  },
  reducers: {
    addToWishlist: (state, action) => {
      const itemExists = state.items.find(item => item._id === action.payload._id);
      if (!itemExists) {
        state.items.push(action.payload);
        saveWishlistToLocalStorage(state.items); 
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      saveWishlistToLocalStorage(state.items); 
    },
    updateWishlistItemQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.items.find(item => item._id === _id);
    
      if (item) {
        item.quantity = quantity;
        saveWishlistToLocalStorage(state.items); 
      } else {
        console.error(`Item with id ${_id} not found`);
      }
    }
  },
});

export const { addToWishlist, removeFromWishlist, updateWishlistItemQuantity } = wishlistSlice.actions;
export default wishlistSlice.reducer;
