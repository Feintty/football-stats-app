import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import config from './config';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  colorWinner:{
    color:'green'
  },
  colorLoser:{
    color:'red'
  }
});

export default function TeamSquadList({id}) {
  const classes = useStyles();
  const [squad,setSquad] = useState();
  const [isDataLoaded,setIsDataLoaded] = useState(false);

  const fetchSquad = () => {
    fetch(`${config.teamById(id)}`, {
      method: "GET",
      headers: { "X-Auth-Token": config.apiKey },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setSquad(result.squad);
          setIsDataLoaded(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    fetchSquad();
  }, []);

  const parseUtcDate = (utcDate) =>{
    const parsedDate = new Date (Date.parse(utcDate));
    return (`${parsedDate.getFullYear()}-${parsedDate.getMonth()}-${parsedDate.getDate()}`)
  }

  const generateCells = () =>{
    return squad.map((player) => (
        <TableRow key={player.id}>
          <TableCell component="th" scope="row">
            {player.name}
          </TableCell>
          <TableCell align="right">{player.position}</TableCell>
          <TableCell align="right">{parseUtcDate(player.dateOfBirth) }</TableCell>
          <TableCell align="right">{player.countryOfBirth}</TableCell>
          <TableCell align="right">{player.nationality}</TableCell>
          <TableCell align="right">{player.shirtNumber}</TableCell>
          <TableCell align="right">{player.role}</TableCell>
          </TableRow>
      ))
  }

 if(!isDataLoaded){
   return <div>загруз</div>
 } else{
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell >Имя</TableCell>
            <TableCell align="right">Позиция</TableCell>
            <TableCell align="right">День рождения</TableCell>
            <TableCell align="right">Место рождения</TableCell>
            <TableCell align="right">Национальность</TableCell>
            <TableCell align="right">Номер</TableCell>
            <TableCell align="right">Роль</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {generateCells()}
        </TableBody>
      </Table>
    </TableContainer>
  );
 }
}
