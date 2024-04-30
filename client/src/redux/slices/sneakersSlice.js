import { createSlice } from '@reduxjs/toolkit';

export const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState: {
    items: [],
    isLoading: null,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setItems, setIsLoading } = sneakersSlice.actions;

export default sneakersSlice.reducer;
