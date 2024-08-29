import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const Select = ({ ...props }) => {
  const { name, label, value, error = null, onChange, options } = props;

  return (
    <FormControl
      style={{
        // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      }}
      variant="outlined"
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value={0}>None</MenuItem>
        {options.map(
          //@ts-ignore
          (item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          )
        )}
      </MuiSelect>

      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
