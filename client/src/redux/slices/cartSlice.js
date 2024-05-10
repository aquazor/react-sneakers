import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: null,
    isLoading: null,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      if (!state.items) {
        state.items = [];
      }

      const index = state.items.findIndex(
        (item) =>
          item.itemId === action.payload.itemId && item.size === action.payload.size
      );

      if (index !== -1) {
        state.items[index] = { ...action.payload };
      } else {
        state.items.push(action.payload);
      }
    },
    decrementCount: (state, action) => {
      const index = state.items.findIndex(
        (item) =>
          item.itemId === action.payload.itemId && item.size === action.payload.size
      );

      if (action.payload.count < 1) {
        state.items.splice(index, 1);
      } else {
        state.items[index] = { ...action.payload };
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setItems, addItem, removeItem, decrementCount, setIsLoading } =
  cartSlice.actions;

export default cartSlice.reducer;
