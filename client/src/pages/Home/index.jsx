import { useDispatch } from 'react-redux';
import { Box, Button, Container, Typography } from '@mui/material';
import { useSelectSneakers } from '../../hooks/useSelectSneakers';
import { SortPanel, SearchInput, SortBrand } from '../../components';
import SneakersItemsList from './SneakersItemsList';
import { applyFilters, clearFilters, setFilters } from '../../redux/slices/sneakersSlice';

const Home = () => {
  const { filteredItems, filters } = useSelectSneakers();

  const dispatch = useDispatch();

  const handleApplyFilter = () => {
    dispatch(applyFilters());
  };

  const handleClearFilter = () => {
    dispatch(clearFilters());
  };

  const handleSearchTermChange = (e) => {
    dispatch(setFilters({ ...filters, searchTerm: e.target.value }));
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
    <Container
      maxWidth={'xl'}
      sx={{ my: 2, display: 'flex', justifyContent: 'space-between', gap: 3 }}
    >
      <Box display={'flex'} flexDirection={'column'} gap={3} width={'250px'} my={4}>
        <SearchInput
          id={'search-sneakers'}
          fullWidth
          value={filters.searchTerm}
          onChange={handleSearchTermChange}
          onKeyDown={handleKeyDown}
        />

        <SortPanel value={filters.sortValue} onChange={handleSortValueChange} />

        <Box>
          <SortBrand
            value={filters.selectedBrands}
            onChange={handleSelectedBrandsChange}
          />
        </Box>

        <Box width={1} display={'grid'} gap={1}>
          <Button fullWidth variant="contained" onClick={handleApplyFilter}>
            Apply Filter
          </Button>

          <Button fullWidth variant="contained" onClick={handleClearFilter}>
            Clear Filter
          </Button>
        </Box>
      </Box>

      <Box flexGrow={1}>
        {filteredItems?.length === 0 && (
          <Typography my={2} paragraph>
            Nothing found for your search query.
          </Typography>
        )}

        <SneakersItemsList items={filteredItems} />
      </Box>
    </Container>
  );
};

export default Home;
