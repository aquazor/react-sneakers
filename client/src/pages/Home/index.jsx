import { Box, Button, Typography } from '@mui/material';
import { useSneakersFilters } from '../../hooks/useSneakersFilters';
import { SortPanel, SearchInput, SortBrand, SortSize } from '../../components';
import { HomePageHelmet } from '../../components/Helmets';
import SneakersItemsList from './SneakersItemsList';
import PageSkeleton from './PageSkeleton';

const Home = () => {
  const {
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
  } = useSneakersFilters();

  return (
    <Box sx={{ maxWidth: '1750px' }} mx={'auto'} my={4} px={2}>
      <HomePageHelmet />

      {!filteredItems && isLoading ? (
        <PageSkeleton />
      ) : (
        <>
          <Box
            display={'grid'}
            gridTemplateColumns={'repeat(auto-fit, minmax(200px, 1fr))'}
            justifyContent={'center'}
            alignItems={'end'}
            gap={2}
            my={4}
          >
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

            <SortSize
              value={filters.selectedSizes}
              onChange={handleSelectedSizesChange}
            />

            <Box width={1} display={'grid'} gap={1}>
              <Button fullWidth variant="contained" onClick={handleApplyFilter}>
                Apply Filter
              </Button>

              <Button fullWidth variant="contained" onClick={handleClearFilter}>
                Clear Filter
              </Button>
            </Box>
          </Box>

          <div>
            {filteredItems?.length === 0 && (
              <Typography my={2} paragraph>
                Nothing found for your search query.
              </Typography>
            )}

            <SneakersItemsList items={filteredItems} />
          </div>
        </>
      )}
    </Box>
  );
};

export default Home;
