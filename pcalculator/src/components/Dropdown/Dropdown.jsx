/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Calculation } from './Dropdown';

export default function DropDown({ onChange, options, selected }) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      // eslint-disable-next-line no-dupe-keys
      margin: '0 auto'
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  return (
    <Calculation>
      <FormControl className={classes.formControl}>
        <Select
          onChange={onChange}
          labelId="demo-simple-select-standard-label"
          label={selected}
          displayEmpty
          renderValue={() => selected}
          className={classes.selectEmpty}>
          {options.map((item, idx) => (
            <MenuItem value={item} key={idx}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Calculation>
  );
}
