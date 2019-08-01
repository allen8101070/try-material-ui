import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import THSRHaveSeatsFilter from './THSRHaveSeatsFilter';

const drawerWidth = 240;
const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class THSRHaveSeats extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getAJAXParam = (originStation, endStation) => {
    fetch(
      `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${originStation}/to/${endStation}/${date}`
    )
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log('TCL: THSRQuickSearch -> getStationData -> data', data);
        // this.setState({
        //   ...this.state,
        //   stationData: data
        // })
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { open, classes, stationData } = this.props;
    return (
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        尚有座位列車查詢
        <THSRHaveSeatsFilter
          stationData={stationData}
          getAJAXParam={this.getAJAXParam}
        />
      </main>
    );
  }
}
export default withStyles(styles)(THSRHaveSeats);
