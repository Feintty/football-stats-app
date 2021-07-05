import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { ButtonGroup, Button, Typography, Container ,Paper} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    margin:theme.spacing(2),
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  }
}));

function NavBar({ activeElement }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={2} >
      <ButtonGroup
        variant="text"
        size="large"
        orientation="vertical"
        color="primary"
        aria-label="large outlined primary button group"
      >
        {activeElement === "Список лиг" ? (
          <Button color="disabled" disabled>
            Список лиг
          </Button>
        ) : (
          <Button component={Link} to="/leagues">
            Список лиг
          </Button>
        )}
        {activeElement === "Список команд" ? (
          <Button color="disabled" disabled>
            Список команд
          </Button>
        ) : (
          <Button component={Link} to="/teams">
            Список команд
          </Button>
        )}
      </ButtonGroup>
    </Paper>
  );
}
export default NavBar;
