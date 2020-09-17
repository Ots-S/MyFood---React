import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import homeImage from "../assets/photo-1566385101042-1a0aa0c1268c.jpg";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: `url(${homeImage})`,
    height: "100vh",
    backgroundSize: "cover",
    opacity: 0.9,
  },
  content: {
    backgroundColor: "white",
    borderRadius: 20,
    [theme.breakpoints.up("sm")]: { height: "50%" },
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid
        container
        item
        justify="center"
        alignItems="center"
        xs={8}
        lg={4}
        className={classes.content}
      >
        <Typography color="primary" variant="h2">
          MyFood
        </Typography>
      </Grid>
    </Grid>
  );
}
