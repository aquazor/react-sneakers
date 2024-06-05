import { Pagination as LibPagination } from '@mui/material';

const Pagination = ({ pagesCount, currentPage, setCurrentPage }) => {
  const handleChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <LibPagination
      siblingCount={0}
      color="primary"
      page={currentPage}
      count={pagesCount}
      onChange={handleChange}
      shape="rounded"
    />
  );
};

export default Pagination;
