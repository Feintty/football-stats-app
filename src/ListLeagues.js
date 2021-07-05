import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import config from "./config";
import { LinearProgress, Container, Paper, Grid } from "@material-ui/core";
import NavBar from "./NavBar";
import LeagueCard from "./LeagueCard";
import ListFilter from "./ListFilter";
import queryString from "query-string";
import {  useLocation } from "react-router-dom";

export default function ListLeagues() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [footballData, setFootballData] = useState();
  const { search } = useLocation();
  const { text } = queryString.parse(search);
  const { year } = queryString.parse(search);

  const useStyles = makeStyles((theme) => ({
    paper:{
      marginTop:theme.spacing(2),
      marginBottom:theme.spacing(2),
      padding:theme.spacing(2)
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

  const fetchFootballData = () => {
    fetch(`${config.competitions}`, {
      method: "GET",
      headers: { "X-Auth-Token": config.apiKey },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setFootballData(result.competitions);
          setIsDataLoaded(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const filterData = (data) => {
    let filteredData = data.slice();

    if (!!year) {
      filteredData = filteredData.filter((competition) => {
        if (
          competition.hasOwnProperty("currentSeason") &&
          competition.currentSeason !== null
        ) {
          const start = Number(
            competition.currentSeason.startDate.match(/^.{4}/)[0]
          );
          const end = Number(
            competition.currentSeason.endDate.match(/^.{4}/)[0]
          );
          return Number(year) >= start && Number(year) <= end;
        }
      });
    }
    if (!!text) {
      filteredData = filteredData.filter((el) => el.name.toLowerCase().includes(text.toLowerCase()));
    }
    return filteredData;
  };

  const createCardsArray = (data) => {
    const cardsArray = [];
    data.forEach((competition) => {
      if (
        competition.hasOwnProperty("currentSeason") &&
        competition.currentSeason !== null
      ) {
        cardsArray.push(
          <LeagueCard
          key={competition.id}
            leagueName={competition.name}
            leagueImg={competition.emblemUrl}
            country={competition.area.name}
            startDate={
              competition.currentSeason.startDate
                ? competition.currentSeason.startDate
                : ""
            }
            endDate={
              competition.currentSeason.endDate
                ? competition.currentSeason.endDate
                : ""
            }
            id={competition.id}
            isDisabled={!config.availableLeagues.includes(competition.id)}
          />
        );
      } else {
        cardsArray.push(
          <LeagueCard
            key={competition.id}
            leagueName={competition.name}
            leagueImg={competition.emblemUrl}
            country={competition.area.name}
            startDate={"none"}
            endDate={"none"}
            id={competition.id}
            isDisabled={!config.availableLeagues.includes(competition.id)}
          />
        );
      }
    });
    return cardsArray;
  };

  useEffect(() => {
    fetchFootballData();
  }, []);

  const loader = ( <Container className={classes.loaderContainer} align="center">
  <LinearProgress className={classes.loader}/>
</Container>)

    return (
      <Grid container >
        <Grid item xs>
        <NavBar activeElement="Список лиг" />
        <ListFilter textValue={text} yearValue={year} />
        </Grid>
        <Grid item xs sm={10}>
          <Paper className={classes.paper}>
          {(isDataLoaded)?createCardsArray(filterData(footballData)):loader}
          </Paper>    
        </Grid>
      </Grid>
      
    );
}

;
