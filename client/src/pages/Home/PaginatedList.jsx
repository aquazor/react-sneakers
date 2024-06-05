import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import useItemsPerPage from '../../hooks/useItemsPerPage';
import SneakersItemsList from './SneakersItemsList';
import Pagination from './Pagination';

const PaginatedList = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = useItemsPerPage();

  const pagesCount = Math.ceil(items?.length / itemsPerPage) || 0;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const currentItems = items?.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    if (pagesCount > 0 && currentPage > pagesCount) {
      setCurrentPage(pagesCount);
    }
  }, [pagesCount, currentPage]);

  return (
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
  );
};

export default PaginatedList;
