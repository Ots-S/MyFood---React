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
import IngredientCard from "./IngredientCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: { marginTop: "5rem" },
});

export default function Ingredients() {
  const [ingredient, setIngredient] = useState();
  const [ingredients, setIngredients] = useState();
  const [postError, setPostError] = useState();
  const [image, setImage] = useState();
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
      .catch(error => setPostError(error.response.status));
    setIngredient("");
    setImage("");
  }

  function deleteIngredient(id) {
    axios.delete("/ingredient/" + id).then(() => {
      getIngredients();
    });
  }

  function describeError(error) {
    switch (error) {
      case 406:
        return "Ce nom existe déjà, veuillez en choisir un autre";
      case 500:
        return "Erreur serveur - Impossible d'enregister l'ingrédient";
      default:
        return "";
    }
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={10}>
        <TextField
          error={postError}
          helperText={postError && describeError(postError)}
          fullWidth
          label="Entrez le nom d'un ingrédient"
          value={ingredient}
          onChange={onChange}
          required
        />
        <TextField
          fullWidth
          label="Entrez le lien d'une image"
          value={image}
          onChange={onChangeImage}
          required
        />
      </Grid>
      <Box my={2}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => saveIngredient()}
          disabled={!image || !ingredient}
        >
          Ajouter
        </Button>
      </Box>
      {ingredients ? (
        <Grid space-around container justify="center" spacing={1} item xs={11}>
          {ingredients.map((ingredient, i) => (
            <Grid item xs={4} md={2}>
              <IngredientCard
                key={i}
                ingredient={ingredient}
                deleteIngredient={deleteIngredient}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        !getError && <CircularProgress color="primary" />
      )}
      <Grid item>
        {getError && <Typography align="center">{getError}</Typography>}
      </Grid>
    </Grid>
  );
}
