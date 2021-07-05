import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import config from "./config";
import { LinearProgress, Container, Grid } from "@material-ui/core";
import NavBar from "./NavBar";
import TeamCard from "./TeamCard";
import ListFilter from "./ListFilter";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

export default function ListTeams() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [teamsData, setTeamsData] = useState();
  const { search } = useLocation();
  const { text } = queryString.parse(search);
  const { year } = queryString.parse(search);

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    cust: {
      background:
        "linear-gradient(63deg, rgba(40,103,41,1) 0%, rgba(15,88,32,1) 50%, rgba(70,195,130,1) 100%);",
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

  const fetchTeams = () => {
    fetch(`${config.teams}`, {
      method: "GET",
      headers: { "X-Auth-Token": config.apiKey },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setTeamsData(result.teams);
          setIsDataLoaded(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const filterData = (data) => {
    let filteredData = data.slice();

    if (year) {
      filteredData = filteredData.filter(
        (team) =>
          new Date(Date.parse(team.lastUpdated)).getFullYear().toString() ===
          year
      );
    }
    if (text) {
      filteredData = filteredData.filter((team) =>
        team.name.toLowerCase().includes(text.toLowerCase())
      );
    }
    return filteredData;
  };

  const createCardsArray = (data) => {
    const cardsArray = [];
    data.forEach((team) => {
      cardsArray.push(
        <Grid item key={team.id}>
          <TeamCard
          key={team.id}
            name={team.name}
            teamImage={team.crestUrl}
            adress={team.address}
            phone={team.phone}
            website={team.website}
            email={team.email}
            id={team.id}
            lastUpdate={team.lastUpdated}
          />
        </Grid>
      );
    });
    return cardsArray;
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const loader = ( <Container className={classes.loaderContainer} align="center">
  <LinearProgress className={classes.loader}/>
</Container>)

    return (
      <Grid container>
        <Grid item xs>
          <NavBar activeElement="Список команд" />
          <ListFilter textValue={text} yearValue={year} />
        </Grid>
        <Grid className={classes.root} container spacing={2} xs sm={10}>
          {(isDataLoaded)?createCardsArray(filterData(teamsData)):loader}
        </Grid>
      </Grid>
    );
}
