import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortPanel = ({ sortValue, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <FormControl size="small" variant="standard" fullWidth sx={{ minWidth: 180 }}>
        <InputLabel id="select-standard-label">Price</InputLabel>
        <Select
          MenuProps={{ sx: { mt: 1 } }}
          labelId="select-standard-label"
          id="select-standard"
          value={sortValue}
          onChange={handleChange}
          label="Price"
        >
          <MenuItem value={1}>Price: High to Low</MenuItem>
          <MenuItem value={2}>Price: Low to High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortPanel;
