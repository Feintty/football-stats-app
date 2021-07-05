import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";

const useStyles = makeStyles((theme) => ({
  cust: {
    background: "#d2e3d1",
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.cust}>
      <Toolbar>
          <Button component={Link} to="/leagues">
            <Typography> FootballApp</Typography>
            <SportsSoccerIcon />
          </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
