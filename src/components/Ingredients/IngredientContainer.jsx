import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles({
  ingredientContainer: {
    border: "1px solid lightgreen",
    borderRadius: 10,
    margin: ".1em",
    padding: ".5em",
    width: "10em",
    height: "10em",
  },
  image: {
    objectFit: "cover",
    borderRadius: 10,
    width: "8em",
    height: "5em",
  },
  delete: {
    "&:hover": {
      color: "green",
    },
  },
});

export default function IngredientContainer({ ingredient, deleteIngredient }) {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.ingredientContainer}
    >
      <Typography align="center">{ingredient.name}</Typography>
      <img
        src={ingredient.image}
        className={classes.image}
        alt={ingredient.name}
      />
      <Button onClick={() => deleteIngredient(ingredient.id)}>
        <DeleteOutlineIcon className={classes.delete} />
      </Button>
    </Grid>
  );
}

IngredientContainer.propTypes = {
  ingredient: PropTypes.object.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
};
