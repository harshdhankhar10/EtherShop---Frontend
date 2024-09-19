// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/slices/cartSlice';
import wishlistReducer from '../redux/slices/wishlistSlice';
import archiveOrdersReducer from '../redux/slices/archiveOrdersSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer, 
    archiveOrders: archiveOrdersReducer

  },
});

export default store;
