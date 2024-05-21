import { useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { useSelectSneakers } from '../../hooks/useSelectSneakers';
import { SortPanel, SearchInput, SortBrand } from '../../components';
import SneakersItemsList from './SneakersItemsList';
import { applyFilters, clearFilters, setFilters } from '../../redux/slices/sneakersSlice';
import SneakersItemLoader from './SneakersItemLoader';

const Home = () => {
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

  const handleSelectedBrandsChange = (brands) => {
    dispatch(setFilters({ ...filters, selectedBrands: brands }));
  };

  const handleSortValueChange = (value) => {
    dispatch(setFilters({ ...filters, sortValue: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleApplyFilter();
    }
  };

  return (
    <Box sx={{ maxWidth: '1750px' }} mx={'auto'} my={2} px={2}>
      <Box
        display={'grid'}
        gridTemplateColumns={'repeat(auto-fit, minmax(200px, 1fr))'}
        justifyContent={'center'}
        alignItems={'end'}
        gap={2}
        my={4}
      >
        {!filteredItems && isLoading ? (
          [...Array(5)].map((_, index) => <SneakersItemLoader key={index} />)
        ) : (
          <>
            <SearchInput
              fullWidth
              id={'search-sneakers'}
              value={filters.searchTerm}
              onChange={handleSearchTermChange}
              handleApplyFilter={handleApplyFilter}
              onKeyDown={handleKeyDown}
            />

            <SortPanel
              value={filters.sortValue}
              onChange={handleSortValueChange}
              handleApplyFilter={handleApplyFilter}
            />

            <SortBrand
              value={filters.selectedBrands}
              onChange={handleSelectedBrandsChange}
            />

            <Box width={1} display={'grid'} gap={1}>
              <Button fullWidth variant="contained" onClick={handleApplyFilter}>
                Apply Filter
              </Button>

              <Button fullWidth variant="contained" onClick={handleClearFilter}>
                Clear Filter
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Box flexGrow={1}>
        {filteredItems?.length === 0 && (
          <Typography my={2} paragraph>
            Nothing found for your search query.
          </Typography>
        )}

        <SneakersItemsList items={filteredItems} />
      </Box>
    </Box>
  );
};

export default Home;
