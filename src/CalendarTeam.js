import React, { useState, useEffect } from "react";
import { Grid, LinearProgress, Container } from "@material-ui/core";
import CalendarFilter from "./CalendarFilter";
import TeamSquadList from "./TeamSquadList";
import MatchesList from "./MatchesList";
import { useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import config from "./config";
import queryString from "query-string";

export default function CalendarTeam() {
  const { id } = useParams();
  const [matchesData, setMatchesData] = useState();
  const [isMatchesDataLoaded, setIsMatchesDataLoaded] = useState(false);
  const { search } = useLocation();
  const { start } = queryString.parse(search);
  const { end } = queryString.parse(search);
  const { year } = queryString.parse(search);

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
    loaderContainer:{
      position:'absolute',
      top:'0',
      left:'0',
      padding:0,
    },
    loader:{
      width: '100vw'
    }
  }));
  const classes = useStyles();

  const fetchMatchesByTeam = () => {
    fetch(`${config.matchesByTeamId(id)}`, {
      method: "GET",
      headers: { "X-Auth-Token": config.apiKey },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setMatchesData(result.matches);
          setIsMatchesDataLoaded(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    fetchMatchesByTeam();
  }, []);

  const parseUtcDate = (utcDate) => {
    const parsedDate = new Date(Date.parse(utcDate));
    return `${parsedDate.getFullYear()}-${parsedDate.getMonth()}-${parsedDate.getDate()}`;
  };

  const filterMatches = () => {
    let filteredMatches = matchesData.slice();
    if (start) {
      const normalizedStartDate = new Date(Date.parse(start));
      filteredMatches = filteredMatches.filter((match) => {
        const normalizedMatchDate = new Date(
          Date.parse(parseUtcDate(match.utcDate))
        );
        return normalizedMatchDate >= normalizedStartDate;
      });
    }
    if (end) {
      const normalizedEndDate = new Date(Date.parse(end));
      filteredMatches = filteredMatches.filter((match) => {
        const normalizedMatchDate = new Date(
          Date.parse(parseUtcDate(match.utcDate))
        );
        return normalizedMatchDate <= normalizedEndDate;
      });
    }
    if (year) {
      const normalizedYear = new Date(Date.parse(year));
      filteredMatches = filteredMatches.filter((match) => {
        const normalizedMatchDate = new Date(
          Date.parse(parseUtcDate(match.utcDate))
        );
        return (
          normalizedMatchDate.getFullYear() === normalizedYear.getFullYear()
        );
      });
    }
    return filteredMatches;
  };

  const loader = ( <Container className={classes.loaderContainer} align="center">
  <LinearProgress className={classes.loader}/>
</Container>)

    return (
      <Grid className={classes.root} container spacing={2}>
        <Grid item xs sm={2}>
          <CalendarFilter />
        </Grid>
        <Grid
          className={classes.root}
          container
          sm={10}
          spacing={2}
          direction="column"
        >
          <Grid item xs>
            {(isMatchesDataLoaded)?<MatchesList
              className={classes.margin}
              matches={filterMatches(matchesData)}
            />:loader}
          </Grid>
          <Grid item xs>
            <TeamSquadList id={id} />
          </Grid>
        </Grid>
      </Grid>
    );
}
