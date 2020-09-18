import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles({
  ingredientContainer: {
    margin: ".1em",
    padding: ".5em",
  },
  image: {
    borderRadius: 10,
    height: "5rem",
    objectFit: "cover",
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
    <Card className={classes.ingredientContainer}>
      <Grid container justify="center">
        <CardContent>
          <Typography>{ingredient.name.toUpperCase()}</Typography>
        </CardContent>
      </Grid>
      <CardMedia
        component="img"
        src={ingredient.image}
        className={classes.image}
        title={ingredient.name}
      />
      <CardActions>
        <Button onClick={() => deleteIngredient(ingredient.id)}>
          <DeleteOutlineIcon className={classes.delete} />
        </Button>
      </CardActions>
    </Card>
  );
}

IngredientContainer.propTypes = {
  ingredient: PropTypes.object.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
};
