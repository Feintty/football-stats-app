import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  colorWinner: {
    color: "green",
  },
  colorLoser: {
    color: "red",
  },
});

export default function MatchesList({ matches }) {
  const classes = useStyles();

  const parseUtcDate = (utcDate) => {
    const parsedDate = new Date(Date.parse(utcDate));
    return `${parsedDate.getFullYear()}-${parsedDate.getMonth()}-${parsedDate.getDate()}`;
  };

  const parseUtcTime = (utcDate) => {
    const parsedDate = new Date(Date.parse(utcDate));
    return `${
      parsedDate.getHours().toString().length === 1
        ? "0" + parsedDate.getHours()
        : parsedDate.getHours()
    }:${
      parsedDate.getMinutes().toString().length === 1
        ? "0" + parsedDate.getMinutes()
        : parsedDate.getMinutes()
    }`;
  };

  const generateCells = () => {
    return matches.map((match) => (
      <TableRow key={match.id}>
        <TableCell component="th" scope="row">
          {match.status}
        </TableCell>
        <TableCell align="right">{parseUtcDate(match.utcDate)}</TableCell>
        <TableCell align="right">{parseUtcTime(match.utcDate)}</TableCell>
        <TableCell
          className={
            match.score.winner === "HOME_TEAM"
              ? classes.colorWinner
              : classes.colorLoser
          }
          align="right"
        >
          {match.homeTeam.name}
        </TableCell>
        <TableCell
          className={
            match.score.winner === "AWAY_TEAM"
              ? classes.colorWinner
              : classes.colorLoser
          }
          align="right"
        >
          {match.awayTeam.name}
        </TableCell>
        <TableCell align="right">
          {match.score.fullTime.homeTeam !== null
            ? `${match.score.fullTime.homeTeam}:${match.score.fullTime.awayTeam}`
            : ""}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Статус</TableCell>
            <TableCell align="right">Дата</TableCell>
            <TableCell align="right">Время</TableCell>
            <TableCell align="right">Команда 1&nbsp;(дома)</TableCell>
            <TableCell align="right">Команда 2&nbsp;(гость)</TableCell>
            <TableCell align="right">Счет&nbsp;(дома:гость)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{generateCells()}</TableBody>
      </Table>
    </TableContainer>
  );
}
