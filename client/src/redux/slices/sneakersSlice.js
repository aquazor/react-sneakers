import { createSlice } from '@reduxjs/toolkit';

export const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState: {
    items: null,
    isLoading: null,
    filteredItems: null,
    filters: {
      searchTerm: '',
      selectedBrands: [],
      sortValue: '',
    },
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    applyFilters: (state) => {
      const { items, filters } = state;
      const { searchTerm, selectedBrands, sortValue } = filters;

      const searchFilteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );

      const brandFilteredItems = searchFilteredItems.filter((item) => {
        if (selectedBrands.length === 0) {
          return true;
        }

        return selectedBrands.some((brand) =>
          item.name.toLowerCase().includes(brand.name.toLowerCase())
        );
      });

      const sortedItems = !sortValue
        ? brandFilteredItems
        : brandFilteredItems.sort((prev, next) => {
            const valueA = sortValue === 1 ? next : prev;
            const valueB = sortValue === 1 ? prev : next;

            return valueA.price - valueB.price;
          });

      state.filteredItems = sortedItems;
    },
    clearFilters: (state) => {
      state.filters = { searchTerm: '', selectedBrands: [], sortValue: '' };
      state.filteredItems = state.items;
    },
  },
});

export const { setItems, setIsLoading, setFilters, applyFilters, clearFilters } =
  sneakersSlice.actions;

export default sneakersSlice.reducer;
