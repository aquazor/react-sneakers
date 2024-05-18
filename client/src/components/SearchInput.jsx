import { InputAdornment, TextField } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const SearchInput = ({ value, onChange, id, label = 'Search', ...rest }) => {
  return (
    <TextField
      {...rest}
      size="small"
      variant="standard"
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ManageSearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
