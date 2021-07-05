import React, { useState } from "react";
import { Paper, TextField, IconButton, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(2),
  },
}));

export default function ListFilter({ textValue, yearValue }) {
  const history = useHistory();
  const classes = useStyles();
  const [currentText, setCurrentText] = useState(textValue ? textValue : "");
  const [currentYear, setCurrentYear] = useState(yearValue ? yearValue : "");

  const onclickButton = () => {
    if (currentText !== "" || currentYear !== "") {
      history.push({
        location: "/",
        search: `?year=${currentYear}&text=${currentText}`,
      });
    } else {
      history.push({
        location: "/",
      });
    }
  };

  return (
    <Paper className={classes.root} elevation={2}>
      <Grid container direction="column" justify="center" alignItems="center">
        <div
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onclickButton();
            }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            className={classes.margin}
            id="standard-basic"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            label="Название"
          />
        </div>
        <div
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onclickButton();
            }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            className={classes.margin}
            id="standard-number"
            value={currentYear}
            onChange={(e) => setCurrentYear(e.target.value)}
            type="number"
            label="Год"
          />
        </div>
        <IconButton className={classes.margin} onClick={onclickButton}>
          <SearchIcon />
        </IconButton>
      </Grid>
    </Paper>
  );
}
