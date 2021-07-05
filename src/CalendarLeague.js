import React, { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LeagueHeading from "./LeagueHeading";
import config from "./config";
import queryString from "query-string";
import { Paper, Grid, Container, LinearProgress } from "@material-ui/core";
import CalendarFilter from "./CalendarFilter";
import LeagueTable from "./LeagueTable";

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

export default function CalendarLeague() {
  const { id } = useParams();
  const [matchesData, setMatchesData] = useState();
  const [isMatchesDataLoaded, setIsMatchesDataLoaded] = useState(false);
  const { search } = useLocation();
  const { start } = queryString.parse(search);
  const { end } = queryString.parse(search);
  const { year } = queryString.parse(search);

  const fetchMatchesData = () => {
    fetch(`${config.matchesByLeagueId(id)}`, {
      method: "GET",
      headers: { "X-Auth-Token": config.apiKey },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setMatchesData(result);
          setIsMatchesDataLoaded(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    fetchMatchesData();
  }, []);

  const parseUtcDate = (utcDate) => {
    const parsedDate = new Date(Date.parse(utcDate));
    return `${parsedDate.getFullYear()}-${parsedDate.getMonth()}-${parsedDate.getDate()}`;
  };

  const filterMatches = () => {
    let filteredMatches = matchesData.matches.slice();
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

  const classes = useStyles();

  const loader = ( <Container className={classes.loaderContainer} align="center">
  <LinearProgress className={classes.loader}/>
</Container>)

    return (
      <Grid container spacing={2}>
        <Grid item xs>
          {isMatchesDataLoaded?<LeagueHeading
            leagueName={matchesData.competition.name}
            country={matchesData.competition.area.name}
          />:loader}
        </Grid>
        <Grid container spacing={2} direction>
          <Grid item xs>
            <CalendarFilter
              startDateValue={start}
              endDateValue={end}
              yearValue={year}
            />
          </Grid>
          <Grid item xs sm={10}>
            <Paper>
              {isMatchesDataLoaded? <LeagueTable matches={filterMatches(matchesData)} />:''}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
}

