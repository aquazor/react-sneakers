import { useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import { applyFilters } from '../redux/slices/sneakersSlice';

const ApplyFilterHint = () => {
  const dispatch = useDispatch();

  const handleApplyFilter = () => {
    dispatch(applyFilters());
  };

  return (
    <Box position={'absolute'} right={-70}>
      <Button variant="text" size="small" onClick={handleApplyFilter}>
        Apply
      </Button>
    </Box>
  );
};

export default ApplyFilterHint;
