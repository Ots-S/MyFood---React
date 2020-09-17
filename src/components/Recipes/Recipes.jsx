import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, TextField, Box, Button, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import RecipeCard from "./RecipeCard";

function Recipes(props) {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState();
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [errorStatus, setErrorStatus] = useState();
  const [image, setImage] = useState("");

  useEffect(() => {
    getIngredients();
    getRecipes();
  }, []);

  function getIngredients() {
    axios.get("/ingredients").then(response => setIngredients(response.data));
  }

  function addIngredientToRecipe(ingredient) {
    setRecipeIngredients(prevState => [...prevState, ingredient]);
  }

  function removeIngredientFromRecipe(ingredient) {
    const newIngredientsList = recipeIngredients.filter(
      eachIngredient => eachIngredient.id !== ingredient.id
    );
    setRecipeIngredients(newIngredientsList);
  }

  function saveRecipe() {
    const recipe = {
      name: recipeName,
      ingredients: recipeIngredients,
      image: image,
    };
    axios
      .post("/recipe", recipe)
      .then(() => getRecipes())
      .catch(error => setErrorStatus(error.response.status));
  }

  function deleteRecipe(id) {
    axios.delete("/recipes/" + id).then(() => getRecipes());
  }

  function getRecipes() {
    axios.get("/recipes").then(responses => setRecipes(responses.data));
  }

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      direction="column"
      style={{}}
    >
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid container item direction="column" alignItems="center">
          {errorStatus === 406 && (
            <Typography>Nom de recette déjà existant</Typography>
          )}
          <TextField
            style={{ width: "20rem" }}
            label="Nom de la recette"
            fullwidth
            required
            value={recipeName}
            onChange={event => setRecipeName(event.target.value)}
          />
          <TextField
            style={{ width: "20rem" }}
            label="Photo de la recette"
            fullwidth
            required
            value={image}
            onChange={event => setImage(event.target.value)}
          />
        </Grid>
        <Grid item>
          <Box my={2}>
            <Autocomplete
              disableClearable
              value={ingredient}
              onChange={(event, newIngredient) => {
                addIngredientToRecipe(newIngredient);
              }}
              id="Ajouter un ingrédient"
              options={ingredients}
              getOptionLabel={ingredient => ingredient.name}
              style={{ width: "20rem" }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Ajouter un ingrédient"
                  variant="outlined"
                  required
                />
              )}
            />
          </Box>
        </Grid>
        {recipeIngredients.length > 0 && (
          <Grid item>
            <ul>
              {recipeIngredients.map(ingredient => (
                <Button
                  key={ingredient.id}
                  onClick={() => removeIngredientFromRecipe(ingredient)}
                >
                  <li>{ingredient.name}</li>
                </Button>
              ))}
            </ul>
          </Grid>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => saveRecipe()}
          disabled={!recipeName || !recipeIngredients.length > 0}
        >
          Enregistrer la recette
        </Button>
      </Grid>
      <Grid item container>
        {recipes &&
          recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              deleteRecipe={deleteRecipe}
            />
          ))}
      </Grid>
    </Grid>
  );
}

Recipes.propTypes = {};

export default Recipes;
