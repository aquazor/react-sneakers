import { InputAdornment, TextField, IconButton } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ClearIcon from '@mui/icons-material/Clear';
import SortIcon from '@mui/icons-material/Sort';

const SearchInput = ({
  value,
  onChange,
  id,
  label = 'Search',
  handleApplyFilter,
  ...rest
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const clearInput = () => {
    onChange('');
  };

  return (
    <TextField
      {...rest}
      size="small"
      variant="standard"
      id={id}
      label={label}
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ManageSearchIcon />
          </InputAdornment>
        ),
        endAdornment: value && (
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
        ),
      }}
    />
  );
};

export default SearchInput;
