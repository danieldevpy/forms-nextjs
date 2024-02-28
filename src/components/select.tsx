import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface SelectProps{
  label: string;
  options?: string[];
  value: string;
  changed: any;
}

export default function BasicSelect(props: SelectProps) {

  const handleChange = (event: SelectChangeEvent) => {
    let value = event.target.value as string;
    props.changed(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Select
          value={props.value}
          label={props.label}
          onChange={handleChange}
        >
          {props.options?.map((option, index)=>(
            <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}