import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PageSidebar from './components/PageSidebar';
import PageHeader from './components/PageHeader';
import { Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import THSRHaveSeats from './pages/THSRHaveSeats/THSRHaveSeats';
import THSRQuickSearch from './pages/THSRQuickSearch/THSRQuickSearch';

const history = createHashHistory();
const CLIENT_WIDTH = document.body.clientWidth;
const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      open: CLIENT_WIDTH > 960 ? true : false,
      stationData: []
    };
  }

  componentDidMount() {
    this.getStationData();
  }

  handleDrawerClose = () => {
    this.setState({
      open: false
    });
  };

  handleDrawerOpen = () => {
    this.setState({
      open: true
    });
  };

  getStationData = () => {
    fetch(
      'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/Station?$top=30&$format=JSON'
    )
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          ...this.state,
          stationData: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { open, stationData } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Router history={history}>
          <PageHeader open={open} handleDrawerOpen={this.handleDrawerOpen} />
          <PageSidebar open={open} handleDrawerClose={this.handleDrawerClose} />
          <Route
            exact
            path="/"
            render={() => (
              <THSRQuickSearch open={open} stationData={stationData} />
            )}
          />
          <Route
            path="/THSR-have-seats"
            render={() => (
              <THSRHaveSeats open={open} stationData={stationData} />
            )}
          />
        </Router>
      </div>
    );
  }
}
export default withStyles(styles)(App);
