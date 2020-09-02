import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button } from "@material-ui/core";

function Ingredientcontainer({ ingredient, deleteIngredient }) {
  return (
    <Grid container justify="center" alignItems="center" item xs={2}>
      <Button
        variant="outlined"
        onClick={() => deleteIngredient(ingredient.id)}
      >
        <Typography>{ingredient.name}</Typography>
        <Typography>X</Typography>
      </Button>
    </Grid>
  );
}

Ingredientcontainer.propTypes = {};

export default Ingredientcontainer;
