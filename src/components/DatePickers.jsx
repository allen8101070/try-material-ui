import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}));

export default function DatePickers(props) {
  const classes = useStyles();
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="發車日期"
        type="date"
        value={props.date}
        onChange={props.getDate}
        InputProps={{ inputProps: { min: props.minDate } }}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  );
}
