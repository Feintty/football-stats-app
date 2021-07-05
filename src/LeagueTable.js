import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";
import MatchesList from "./MatchesList";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function LeagueTable({ matches }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const parseUtcDate = (utcDate) => {
    const parsedDate = new Date(Date.parse(utcDate));
    return `${parsedDate.getFullYear()}-${parsedDate.getMonth()}-${parsedDate.getDate()}`;
  };

  const createTable = () => {
    const table = {
      tabs: [],
      tabPanels: [],
    };
    matches.forEach((match) => {
      table.tabs.push(parseUtcDate(match.utcDate));
    });
    table.tabs = Array.from(new Set(table.tabs));
    table.tabs.forEach((tab, index) => {
      table.tabPanels.push(
        <TabPanel value={value} index={index}>
          <MatchesList
            matches={matches.filter(
              (match) => parseUtcDate(match.utcDate) === tab
            )}
          />
        </TabPanel>
      );
    });
    table.tabs = table.tabs.map((match, index) => (
      <Tab label={match} {...a11yProps(index)} />
    ));
    return table;
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {createTable().tabs}
        </Tabs>
      </AppBar>
      {createTable().tabPanels}
    </div>
  );
}
