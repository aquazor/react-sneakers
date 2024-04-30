import { configureStore } from '@reduxjs/toolkit';
import sneakersSlice from './slices/sneakersSlice';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: { sneakers: sneakersSlice, auth: authSlice, cart: cartSlice },
});
