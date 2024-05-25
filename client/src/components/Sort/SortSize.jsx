import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { SIZES } from '../../constants';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SortSize = ({ value, onChange }) => {
  const handleChange = (event, updatedSizes) => {
    onChange(updatedSizes);
  };

  const defaultProps = {
    options: SIZES,
    getOptionLabel: (size) => size.value,
  };

  return (
    <Autocomplete
      multiple
      fullWidth
      id="sort-size"
      {...defaultProps}
      disableCloseOnSelect
      onChange={handleChange}
      value={value}
      renderInput={({ inputProps, ...rest }) => (
        <TextField
          {...rest}
          inputProps={{ ...inputProps, readOnly: true }}
          label="Sizes"
          variant="standard"
        />
      )}
      renderOption={(props, size, { selected }) => {
        return (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {size.value}
          </li>
        );
      }}
    />
  );
};

export default SortSize;
