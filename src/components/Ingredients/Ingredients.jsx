import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box, Typography } from "@material-ui/core";
import axios from "axios";
import IngredientContainer from "./IngredientContainer";

export default function Ingredients() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([{}]);
  const [errorStatus, setErrorStatus] = useState();
  const [image, setImage] = useState("");

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
    axios.get("/ingredients").then(response => setIngredients(response.data));
  }

  function saveIngredient() {
    const newIngredient = { name: ingredient, image: image };
    axios
      .post("/ingredient", newIngredient)
      .then(() => {
        getIngredients();
      })
      .catch(error => setErrorStatus(error.response.status));
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
      style={{ height: "100vh" }}
    >
      <Grid item container alignItems="center" direction="column">
        <Grid container direction="column" alignItems="center" item>
          {errorStatus === 406 && (
            <Typography>Nom de recette déjà existant</Typography>
          )}
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
        {ingredients && (
          <Grid container justify="center" item xs={12}>
            {ingredients.map((ingredient, i) => (
              <IngredientContainer
                key={i}
                ingredient={ingredient}
                deleteIngredient={deleteIngredient}
              />
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
