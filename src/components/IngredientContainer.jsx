import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  ingredientContainer: {
    background: "lightgreen",
    border: 1,
    borderRadius: 3,
    margin: ".1em",
    padding: ".5em",
  },
});

export default function Ingredientcontainer({ ingredient, deleteIngredient }) {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      item
      xs={2}
      className={classes.ingredientContainer}
    >
      <Typography>{ingredient.name}</Typography>
      <Button onClick={() => deleteIngredient(ingredient.id)}>
        <Typography>X</Typography>
      </Button>
    </Grid>
  );
}

Ingredientcontainer.propTypes = {
  ingredient: PropTypes.object.isRequired,
};
