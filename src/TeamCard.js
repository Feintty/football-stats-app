import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {Button, Container} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  card: {
    width: 300,
    height:550,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    height:200
  },
  fit: {
    objectFit: "scale-down",
  },
  content: {
    textAlign: "left",
    padding: theme.spacing(3),
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing(),
    },
  },
}));

export default function TeamCard({
  name,
  teamImage,
  adress,
  phone,
  website,
  email,
  id,
  lastUpdate
}) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Container align="center">
      <Typography variant="overline" color="textSecondary">
          {lastUpdate}
        </Typography>
      </Container>
      <CardMedia className={classes.media} image={teamImage} />
      <CardContent className={classes.content}>
        <Typography
          align="center"
          className={"heading"}
          variant={"h6"}
          gutterBottom
        >
          {name}
        </Typography>
        <Typography variant="subtitle2" className={"subheading"} >
          Адрес: {adress}
        </Typography>
        <Typography variant="subtitle2" className={"subheading"} >
          Телефон: {phone}
        </Typography>
        <Typography variant="subtitle2" className={"subheading"} >
          Сайт: {website?website:"отсутствует"}
        </Typography>
        <Typography variant="subtitle2">
          Почта: {email?email:"отсутствует"}
        </Typography>
        <Divider className={classes.divider} light />
        <Container align="center">
        <Button  component={Link} to={`/teamcalendar/${id}`} color="primary" align="center" variant="contained">Расписание</Button>
        </Container>
        
      </CardContent>
    </Card>
  );
}
