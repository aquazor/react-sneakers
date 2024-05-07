import { createSlice } from '@reduxjs/toolkit';

export const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState: {
    items: null,
    isLoading: null,
    sortValue: '',
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
  },
});

export const { setItems, setIsLoading, setSortValue } = sneakersSlice.actions;

export default sneakersSlice.reducer;
