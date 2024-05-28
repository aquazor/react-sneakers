import { Pagination as LibPagination } from '@mui/material';

const Pagination = ({ pagesCount, currentPage, setCurrentPage }) => {
  const handleChange = (event, page) => {
    setCurrentPage(page);
    window.scroll(0, 0);
  };

  return (
    <LibPagination
      showFirstButton={pagesCount > 3}
      showLastButton={pagesCount > 3}
      color="primary"
      page={currentPage}
      count={pagesCount}
      onChange={handleChange}
      shape="rounded"
    />
  );
};

export default Pagination;
