import { useDispatch } from 'react-redux';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { setSortValue } from '../../redux/slices/sneakersSlice';
import { useSelectSneakers } from '../../hooks/useSelectSneakers';

const SortPanel = () => {
  const { sortValue } = useSelectSneakers();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setSortValue(e.target.value));
  };

  return (
    <Box my={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <FormControl size="small" variant="standard" sx={{ minWidth: 180 }}>
        <InputLabel id="select-standard-label">Sort by</InputLabel>
        <Select
          MenuProps={{ sx: { mt: 1 } }}
          labelId="select-standard-label"
          id="select-standard"
          value={sortValue}
          onChange={handleChange}
          label="Sort by"
        >
          <MenuItem value={1}>Price: High to Low</MenuItem>
          <MenuItem value={2}>Price: Low to High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortPanel;
