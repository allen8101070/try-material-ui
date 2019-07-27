import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PageSidebar from './components/PageSidebar';
import PageHeader from './components/PageHeader';
import THSRHaveSeats from './pages/THSRHaveSeats/THSRHaveSeats';
import THSRQuickSearch from './pages/THSRQuickSearch/THSRQuickSearch';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleDrawerClose() {
    setOpen(false);
  }
  function handleDrawerOpen() {
    setOpen(true);
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <PageHeader open={open} handleDrawerOpen={handleDrawerOpen} />
      <PageSidebar open={open} handleDrawerClose={handleDrawerClose} />
      <THSRHaveSeats open={open} />
    </div>
  );
}
