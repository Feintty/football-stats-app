import React, { useState } from "react";
import { Paper, TextField, IconButton, Grid } from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  padding: {
    padding: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(2),
  },
}));

 export default function CalendarFilter({ startDateValue, endDateValue, yearValue }) {
  const history = useHistory();
  const classes = useStyles();
  const [currentYear, setCurrentYear] = useState(yearValue ? yearValue : "");
  const [startDate, setStartDate] = useState(
    startDateValue ? new Date(Date.parse(startDateValue)) : null
  );
  const [endDate, setEndDate] = useState(
    endDateValue ? new Date(Date.parse(endDateValue)) : null
  );

  const onclickButton = () => {
    const queryStr = `${startDate ? "start=" + parseUtcDate(startDate) : ""}${
      endDate ? "&end=" + parseUtcDate(endDate) : ""
    }${currentYear ? "&year=" + currentYear : ""}`;
    history.push({
      location: "/",
      search: queryStr,
    });
  };

  const parseUtcDate = (utcDate) => {
    const parsedDate = new Date(Date.parse(utcDate));
    return `${parsedDate.getFullYear()}-${
      parsedDate.getMonth() + 1
    }-${parsedDate.getDate()}`;
  };

  const onStartDateChange = (date) => {
    setStartDate(date);
  };

  const onEndDateChange = (date) => {
    setEndDate(date);
  };

  //<form> перехватывает через обработчик нажатие на энтер
  return (
    <Paper className={classes.root} elevation={2}>
      <Grid container direction="column" justify="center" alignItems="center">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Начало"
            value={startDate}
            onChange={onStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Конец"
            value={endDate}
            onChange={onEndDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        {/* <IconButton className={classes.margin} onClick = {onclickButton}> */}
        <div className={classes.padding} noValidate autoComplete="off">
          <TextField
            id="standard-number"
            value={currentYear}
            onChange={(e) => setCurrentYear(e.target.value)}
            type="number"
            label="Год"
          />
        </div>
        <IconButton onClick={onclickButton} className={classes.margin}>
          <SearchIcon />
        </IconButton>
      </Grid>
    </Paper>
  );
}
