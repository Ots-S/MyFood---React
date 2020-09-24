import React, { useState } from "react";
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
import DeleteConfirmationModal from "../DeleteConfirmationModal";

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
  deleteButton: { "&:hover": { color: "teal" } },
});

export default function IngredientContainer({ ingredient, deleteIngredient }) {
  const classes = useStyles();
  const [open, setOpen] = useState();

  function handleOpen() {
    setOpen(prev => !prev);
  }

  return (
    <Card className={classes.ingredientContainer}>
      <Grid container justify="center">
        <CardContent>
          <Typography color="primary">
            {ingredient.name.toUpperCase()}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          src={ingredient.image}
          className={classes.image}
          title={ingredient.name}
        />
        <CardActions>
          <Button onClick={() => setOpen(prev => !prev)}>
            <DeleteOutlineIcon className={classes.deleteButton} />
          </Button>
        </CardActions>
      </Grid>
      <DeleteConfirmationModal
        title={"Êtes-vous sûr de vouloir supprimer cet ingrédient ?"}
        element={ingredient}
        open={open}
        handleOpen={handleOpen}
        deleteElement={deleteIngredient}
      />
    </Card>
  );
}

IngredientContainer.propTypes = {
  ingredient: PropTypes.object.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
};
