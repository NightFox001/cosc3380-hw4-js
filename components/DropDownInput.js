import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const DropDownInput = ({ options, selected, onChange, title, loading, defaultOption }) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id={`${title}-label`}>{title}</InputLabel>
            <Select
                labelId={`${title}-label`}
                id={title}
                value={selected}
                onChange={(e) => onChange(e.target.value)}
            >
                {loading && (
                    <MenuItem value={-1}>Loading</MenuItem>
                )}
                {defaultOption && (
                    <MenuItem value={defaultOption.value}>{defaultOption.label}</MenuItem>
                )}
                {options.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}