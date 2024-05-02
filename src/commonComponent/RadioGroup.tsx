import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText
} from "@mui/material";

const RadioGroup = ({ ...props }) => {
  const { name, label, value, error = null,onChange, items } = props;

  return (
    <FormControl 
    {...(error && { error: true })}>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange} >
        {items.map((item: any) => (
          <FormControlLabel
            key={item.id}
            value={item.name}
            control={<Radio />}
            label={item.title}
           
          />
        ))}
 
      </MuiRadioGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default RadioGroup;
