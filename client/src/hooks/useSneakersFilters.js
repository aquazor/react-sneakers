import { useDispatch } from 'react-redux';
import { useSelectSneakers } from './useSelectSneakers';
import { applyFilters, clearFilters, setFilters } from '../redux/slices/sneakersSlice';

export const useSneakersFilters = () => {
  const { filteredItems, filters, isLoading } = useSelectSneakers();

  const dispatch = useDispatch();

  const handleApplyFilter = () => {
    dispatch(applyFilters());
  };

  const handleClearFilter = () => {
    dispatch(clearFilters());
  };

  const handleSearchTermChange = (value) => {
    dispatch(setFilters({ ...filters, searchTerm: value }));
  };

  const handleSelectedBrandsChange = (value) => {
    dispatch(setFilters({ ...filters, selectedBrands: value }));
  };

  const handleSelectedSizesChange = (value) => {
    dispatch(setFilters({ ...filters, selectedSizes: value }));
  };

  const handleSortValueChange = (value) => {
    dispatch(setFilters({ ...filters, sortValue: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleApplyFilter();
    }
  };

  return {
    filteredItems,
    filters,
    isLoading,
    handleApplyFilter,
    handleClearFilter,
    handleSearchTermChange,
    handleSelectedBrandsChange,
    handleSelectedSizesChange,
    handleSortValueChange,
    handleKeyDown,
  };
};
