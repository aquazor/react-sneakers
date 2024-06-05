import { Box, Button } from '@mui/material';
import { SortPanel, SearchInput, SortBrand, SortSize } from '../../components';
import { useSneakersFilters } from '../../hooks/useSneakersFilters';

const FiltersPanel = () => {
  const {
    filters,
    handleApplyFilter,
    handleClearFilter,
    handleSearchTermChange,
    handleSelectedBrandsChange,
    handleSelectedSizesChange,
    handleSortValueChange,
    handleKeyDown,
  } = useSneakersFilters();

  return (
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
      <Box
        display={'grid'}
        gridTemplateColumns={'repeat(auto-fit, minmax(200px, 1fr))'}
        justifyContent={'center'}
        alignItems={'center'}
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

        <SortBrand value={filters.selectedBrands} onChange={handleSelectedBrandsChange} />

        <SortSize value={filters.selectedSizes} onChange={handleSelectedSizesChange} />

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
  );
};

export default FiltersPanel;
