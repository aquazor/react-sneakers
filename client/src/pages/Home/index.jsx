import { useEffect, useState } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useSneakersFilters } from '../../hooks/useSneakersFilters';
import useItemsPerPage from '../../hooks/useItemsPerPage';
import { SortPanel, SearchInput, SortBrand, SortSize } from '../../components';
import { HomePageHelmet } from '../../components/Helmets';
import SneakersItemsList from './SneakersItemsList';
import PageSkeleton from './PageSkeleton';
import Pagination from './Pagination';

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

  const [isExpanded, setIsExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = useItemsPerPage();

  const pagesCount = Math.ceil(filteredItems?.length / itemsPerPage) || 0;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const currentItems = filteredItems?.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    if (pagesCount > 0 && currentPage > pagesCount) {
      setCurrentPage(pagesCount);
    }
  }, [pagesCount, currentPage]);

  return (
    <Box sx={{ maxWidth: '1500px' }} mx={'auto'} my={2} px={2}>
      <HomePageHelmet />

      {!filteredItems && isLoading ? (
        <PageSkeleton />
      ) : (
        <Box
          display={'flex'}
          gap={2}
          sx={{
            '@media (max-width: 900px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Box
            width={1}
            maxWidth={270}
            mt={2}
            sx={{
              '@media (max-width: 900px)': {
                maxWidth: '100%',
              },
            }}
          >
            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
              <Button onClick={() => setIsExpanded((curr) => !curr)}>
                {isExpanded ? 'Hide filters' : 'Show filters'}
              </Button>
            </Box>

            <Divider />

            <Box
              display={isExpanded ? 'grid' : 'none'}
              gridTemplateColumns={'repeat(auto-fit, minmax(200px, 1fr))'}
              justifyContent={'center'}
              alignItems={'end'}
              gap={2}
              mt={2}
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
          </Box>

          {filteredItems?.length > 0 ? (
            <Box flexGrow={1} my={2}>
              <Box display={'flex'} justifyContent={'center'}>
                <Pagination
                  pagesCount={pagesCount}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </Box>

              <SneakersItemsList items={currentItems} />

              <Box display={'flex'} justifyContent={'center'}>
                <Pagination
                  pagesCount={pagesCount}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </Box>
            </Box>
          ) : (
            <Typography variant="h5" m={4}>
              Nothing found for your search query.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Home;
