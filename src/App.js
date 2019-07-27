import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PageSidebar from './components/PageSidebar';
import PageHeader from './components/PageHeader';
import { Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import THSRHaveSeats from './pages/THSRHaveSeats/THSRHaveSeats';
import THSRQuickSearch from './pages/THSRQuickSearch/THSRQuickSearch';

const history = createHashHistory();

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
      <Router history={history}>
        <PageHeader open={open} handleDrawerOpen={handleDrawerOpen} />
        <PageSidebar open={open} handleDrawerClose={handleDrawerClose} />
        <Route exact path="/" render={() => <THSRQuickSearch open={open} />} />
        <Route
          path="/THSR-have-seats"
          render={() => <THSRHaveSeats open={open} />}
        />
      </Router>
    </div>
  );
}
