import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { BRANDS } from '../../constants';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SortBrand = ({ selectedBrands, onChange }) => {
  const handleChange = (event, updatedBrands) => {
    onChange(updatedBrands);
  };

  const defaultProps = {
    options: BRANDS,
    getOptionLabel: (brand) => brand.name,
  };

  return (
    <Autocomplete
      multiple
      id="sort-brand"
      {...defaultProps}
      disableCloseOnSelect
      onChange={handleChange}
      value={selectedBrands}
      renderOption={(props, brand, { selected }) => {
        return (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {brand.name}
          </li>
        );
      }}
      fullWidth
      renderInput={(params) => (
        <TextField {...params} label="Brands" variant="standard" />
      )}
    />
  );
};

export default SortBrand;
