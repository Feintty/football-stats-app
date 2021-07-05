import React from "react";
import Header from "./Header";
import ListLeagues from "./ListLeagues";
import CalendarLeague from './CalendarLeague'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ListTeams from './ListTeams'
import CalendarTeam from "./CalendarTeam";

function App() {
  return (
    <div className="wrapper">
      <Router>
         <Header />
        <Switch>
          <Route path={`/leagues`}>
            <ListLeagues />
          </Route>
          <Route path="/teams">
            <ListTeams/>
          </Route>
          <Route path="/leaguecalendar/:id">
            <CalendarLeague/>
          </Route>
          <Route path="/teamcalendar/:id">
            <CalendarTeam/>
          </Route>
          <Redirect to="/leagues" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
