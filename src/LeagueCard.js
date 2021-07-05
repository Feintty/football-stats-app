import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EmojiEvents from "@material-ui/icons/EmojiEvents";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function LeagueCard({
  leagueName,
  leagueImg,
  country,
  startDate,
  endDate,
  id,
  isDisabled,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            className={classes.large}
            variant="rounded"
            src={
              leagueImg
                ? leagueImg
                : "https://upload.wikimedia.org/wikipedia/commons/4/41/Noimage.svg"
            }
          ></Avatar>
        }
        action={
          <Grid container 
          justify="center"
          alignItems="center"
        >
            {isDisabled ? (
              <Grid item>
                <Button disabled>
                  <EmojiEvents className={classes.extendedIcon} />
                  Матчи
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button component={Link} to={`/leaguecalendar/${id}`}>
                  <EmojiEvents className={classes.extendedIcon} />
                  Матчи
                </Button>
              </Grid>
            )}
            <Grid item>
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
          </Grid>
        }
        titleTypographyProps={{ variant: "h6" }}
        title={leagueName}
        subheader={`${country}, ${startDate.match(/^.{4}/)[0]}-${
          endDate.match(/^.{4}/)[0]
        }`}
      />
      <CardActions disableSpacing></CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Страна: {country}</Typography>
          <Typography paragraph>Дата начала: {startDate}</Typography>
          <Typography paragraph>Дата окончания: {endDate}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default LeagueCard;
