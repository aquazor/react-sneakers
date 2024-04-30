import { createSlice } from '@reduxjs/toolkit';
import { getTokenFromLocal } from '../../utils/getTokenFromLocal';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userAuth: {
      user: null,
      token: getTokenFromLocal() || null,
    },
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userAuth.user = action.payload;
    },
    setToken: (state, action) => {
      const token = action.payload;

      state.userAuth.token = token;
      localStorage.setItem('token', token);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setToken, setIsLoading } = authSlice.actions;

export default authSlice.reducer;
