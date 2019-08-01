import React from 'react';
import dayjs from 'dayjs';
import { withStyles } from '@material-ui/core/styles';
import DatePickers from '../../components/DatePickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import SimpleDialog from '../../components/Dialogs';

const ENUM = {
  MINDATE: dayjs().format('YYYY-MM-DD'),
  DIALOG_TEXT: {
    STATION_EMPTY: '請選擇列車起點站和終點站',
    STATION_EQUAL: '列車起點站和終點站不得相同',
    DATE_EMPTY: '請選擇列車發車日',
    ALL_EMPTY: '請選擇日期與列車站以供查詢'
  }
};
const styles = theme => ({
  filterWrap: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  button: {
    marginTop: '12px'
  }
});

class THSRQuickSearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ENUM.MINDATE,
      minDate: ENUM.MINDATE,
      originStation: '',
      endStation: '',
      isDialogOpen: false,
      dialogText: ''
    };
  }
  handleDatePickersChange = event => {
    this.setState({
      date: event.target.value
    });
  };

  handleOriginChange = stateName => event => {
    this.setState({
      ...this.state,
      [stateName]: event.target.value
    });
  };

  handleBtnClick = () => {
    const { date, originStation, endStation } = this.state;
    console.log({
      date,
      originStation,
      endStation
    });
    this.checkFilterData();
  };

  closeDialog = () => {
    this.setState({
      isDialogOpen: false
    });
  };

  //todo 封裝抽出成獨立的 method
  checkFilterData = () => {
    const { date, originStation, endStation } = this.state;
    if (date === originStation && date === endStation) {
      this.setState({
        dialogText: ENUM.DIALOG_TEXT.ALL_EMPTY,
        isDialogOpen: true
      });
    } else if (originStation === '' && originStation === endStation) {
      this.setState({
        dialogText: ENUM.DIALOG_TEXT.STATION_EMPTY,
        isDialogOpen: true
      });
    } else if (originStation === endStation) {
      this.setState({
        dialogText: ENUM.DIALOG_TEXT.STATION_EQUAL,
        isDialogOpen: true
      });
    } else if (originStation === '' || endStation === '') {
      this.setState({
        dialogText: ENUM.DIALOG_TEXT.STATION_EMPTY,
        isDialogOpen: true
      });
    } else if (date === '') {
      this.setState({
        dialogText: ENUM.DIALOG_TEXT.DATE_EMPTY,
        isDialogOpen: true
      });
    } else {
      console.log({
        date,
        originStation,
        endStation
      });
      this.props.getAJAXParam(date, originStation, endStation);
    }
  };

  render() {
    const {
      date,
      minDate,
      originStation,
      endStation,
      isDialogOpen,
      dialogText
    } = this.state;
    const { classes, stationData } = this.props;
    return (
      <div className={classes.filterWrap}>
        <FormControl className={classes.formControl}>
          <DatePickers
            date={date}
            minDate={minDate}
            getDate={this.handleDatePickersChange}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="origin-station">起點</InputLabel>
          <Select
            native
            value={originStation}
            onChange={this.handleOriginChange('originStation')}
            inputProps={{
              name: 'originStation',
              id: 'origin-station'
            }}
          >
            <option value="" />
            {stationData.length &&
              stationData.map(item => {
                return (
                  <option value={item.StationID} key={item.StationID}>
                    {item.StationName.Zh_tw}
                  </option>
                );
              })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="end-station">終點</InputLabel>
          <Select
            native
            value={endStation}
            onChange={this.handleOriginChange('endStation')}
            inputProps={{
              name: 'endStation',
              id: 'end-station'
            }}
          >
            <option value="" />
            {stationData.length &&
              stationData.map(item => {
                return (
                  <option value={item.StationID} key={item.StationID}>
                    {item.StationName.Zh_tw}
                  </option>
                );
              })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleBtnClick}
          >
            搜尋
          </Button>
        </FormControl>
        <SimpleDialog
          open={isDialogOpen}
          onClose={this.closeDialog}
          text={dialogText}
        />
      </div>
    );
  }
}

export default withStyles(styles)(THSRQuickSearchFilter);
