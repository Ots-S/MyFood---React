import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function Profile(props) {
  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Typography variant="h6">Prénom</Typography>
    </Grid>
  );
}
