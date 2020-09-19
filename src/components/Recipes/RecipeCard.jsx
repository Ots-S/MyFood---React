import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Typography,
  Card,
  CardActions,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import PopUp from "../PopUp";
import DeleteConfirmationPopUp from "../DeleteConfirmationPopUp";

const useStyles = makeStyles({
  root: {
    width: 275,
    height: 300,
  },
  title: {
    fontSize: 14,
  },
  image: {
    objectFit: "cover",
  },
});

export default function RecipeCard({ recipe, deleteRecipe }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  function openIngredientsPopUp() {
    setOpenModal(prevState => !prevState);
  }
  function openDeletePopUp() {
    setOpenDeleteModal(prevState => !prevState);
  }

  return (
    <Card className={classes.root}>
      <Grid container justify="center">
        <CardContent>
          <Typography color="primary" variant="h5" component="h2">
            {recipe.name}
          </Typography>
          <CardMedia
            component="img"
            src={recipe.image}
            className={classes.image}
            title={recipe.name}
          />
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={openIngredientsPopUp}>
            <FormatListBulletedIcon />
          </Button>
          <Button color="primary" onClick={openDeletePopUp}>
            <DeleteOutlineIcon />
          </Button>
        </CardActions>
      </Grid>
      {openModal && (
        <PopUp
          open={openModal}
          items={recipe.ingredients}
          handleOpen={openIngredientsPopUp}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationPopUp
          open={openDeleteModal}
          handleOpen={openDeletePopUp}
          item={recipe}
          deleteElement={deleteRecipe}
        />
      )}
    </Card>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
};
