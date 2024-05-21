import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SortIcon from '@mui/icons-material/Sort';

const SortPanel = ({ value, onChange, handleApplyFilter }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const clearInput = () => {
    onChange('');
  };

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      position={'relative'}
    >
      <FormControl
        size="small"
        variant="standard"
        sx={{ position: 'relative' }}
        fullWidth
      >
        <InputLabel id="select-sort-label">Price</InputLabel>
        <Select
          endAdornment={
            value && (
              <>
                <IconButton
                  size="small"
                  onClick={handleApplyFilter}
                  sx={{
                    color: 'primary.main',
                  }}
                >
                  <SortIcon fontSize="small" />
                </IconButton>
                <IconButton sx={{ mr: 2 }} onClick={clearInput} size="small">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </>
            )
          }
          MenuProps={{ sx: { mt: 1 } }}
          labelId="select-sort-label"
          id="select-sort"
          value={value}
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
