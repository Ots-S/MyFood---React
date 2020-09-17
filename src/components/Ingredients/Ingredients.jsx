import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import IngredientContainer from "./IngredientContainer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    height: "100vh",
  },
});

export default function Ingredients() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState();
  const [postError, setPostError] = useState();
  const [image, setImage] = useState("");
  const [getError, setGetError] = useState("");
  const classes = useStyles();

  useEffect(() => {
    getIngredients();
  }, []);

  function onChange(event) {
    setIngredient(event.target.value);
  }

  function onChangeImage(event) {
    setImage(event.target.value);
  }

  function getIngredients() {
    axios
      .get("/ingredients")
      .then(response => setIngredients(response.data))
      .catch(() =>
        setGetError(
          "Erreur serveur - Impossible de récupérer la liste des ingrédients, veuillez réessayer plus tard."
        )
      );
  }

  function saveIngredient() {
    const newIngredient = { name: ingredient, image: image };
    axios
      .post("/ingredient", newIngredient)
      .then(() => {
        getIngredients();
      })
      .catch(error =>
        error.response.status === 406
          ? setPostError(
              "Nom de recette déjà existant, veuillez en choisir un autre"
            )
          : setPostError(
              "Erreur serveur - Impossible d'enregister l'ingrédient, veuillez réessayer plus tard."
            )
      );
    setIngredient("");
    setImage("");
  }

  function deleteIngredient(id) {
    axios.delete("/ingredient/" + id).then(() => {
      getIngredients();
    });
  }

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
      className={classes.container}
    >
      <Grid item container alignItems="center" direction="column">
        <Grid container direction="column" alignItems="center" item>
          {postError && <Typography>{postError}</Typography>}
          <TextField
            style={{ width: "20rem" }}
            fullWidth
            label="Entrez le nom d'un ingrédient"
            value={ingredient}
            onChange={onChange}
            required
          />
          <TextField
            style={{ width: "20rem" }}
            fullWidth
            label="Entrez le lien d'une image"
            value={image}
            onChange={onChangeImage}
            required
          />
        </Grid>
        <Grid item>
          <Box my={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => saveIngredient()}
            >
              Ajouter
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid item container justify="center">
        {ingredients ? (
          <Grid container justify="center" item xs={12}>
            {ingredients.map((ingredient, i) => (
              <IngredientContainer
                key={i}
                ingredient={ingredient}
                deleteIngredient={deleteIngredient}
              />
            ))}
          </Grid>
        ) : (
          !getError && <CircularProgress color="primary" />
        )}
        <Grid item>
          {getError && <Typography align="center">{getError}</Typography>}
        </Grid>
      </Grid>
    </Grid>
  );
}
