import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
 root:{
   padding:theme.spacing(2),
   marginTop:theme.spacing(1)
 }
}));

export default function LeagueHeading({
  leagueName,
  country,
}) {
  const classes = useStyles();


  return (
    <Paper className={classes.root}>
        <Typography variant="h4" gutterBottom>{leagueName}</Typography>
        <Typography variant="h5" gutterBottom color="textSecondary">Страна: {country}</Typography>
    </Paper>
  );
}
