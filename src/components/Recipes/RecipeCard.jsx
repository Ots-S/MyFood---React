import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ConfirmationModal from "../ConfirmationModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const useStyles = makeStyles({
  root: {},
  title: {
    fontSize: 14,
  },
  image: {
    borderRadius: 10,
    height: "5rem",
    objectFit: "cover",
  },
});

export default function RecipeCard({
  recipe,
  deleteRecipe,
  removeIngredientFromRecipe,
  addIngredientToRecipe,
  ingredients,
}) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddingModal, setOpenAddingModal] = useState(false);

  function openIngredientsPopUp() {
    setOpenModal(prevState => !prevState);
  }

  function openDeletePopUp() {
    setOpenDeleteModal(prevState => !prevState);
  }

  function openAddingIngredientModal() {
    setOpenAddingModal(prevState => !prevState);
  }

  return (
    <Card className={classes.root}>
      <Grid container item direction="column" alignItems="center">
        <CardContent>
          <Typography
            color="primary"
            variant="h5"
            component="h2"
            align="center"
          >
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
          <Button color="primary" onClick={openAddingIngredientModal}>
            <PlaylistAddIcon />
          </Button>
          <Button color="primary" onClick={openIngredientsPopUp}>
            <FormatListBulletedIcon />
          </Button>
          <Button color="primary" onClick={openDeletePopUp}>
            <DeleteOutlineIcon />
          </Button>
        </CardActions>
      </Grid>
      {openModal && (
        <ConfirmationModal
          title={"Liste des ingrédients"}
          open={openModal}
          items={recipe.ingredients}
          handleOpen={openIngredientsPopUp}
          removeIngredientFromRecipe={removeIngredientFromRecipe}
          recipe={recipe}
        />
      )}
      {openDeleteModal && (
        <DeleteConfirmationModal
          title={"Êtes-vous sûr de vouloir supprimer cette recette ?"}
          element={recipe}
          open={openDeleteModal}
          handleOpen={openDeletePopUp}
          deleteElement={deleteRecipe}
        />
      )}
      {openAddingModal && (
        <ConfirmationModal
          title={"Ajouter un ingrédient"}
          open={openAddingModal}
          items={ingredients}
          handleOpen={openAddingIngredientModal}
          recipe={recipe}
          adding={true}
          addIngredientToRecipe={addIngredientToRecipe}
        />
      )}
    </Card>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
};
