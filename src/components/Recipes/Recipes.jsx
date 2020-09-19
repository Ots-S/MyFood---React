import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { makeStyles } from "@material-ui/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "5rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "6rem",
    },
  },
  input: {
    marginTop: "1rem",
  },
}));

function Recipes() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState();
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [recipes, setRecipes] = useState();
  const [getError, setGetError] = useState(false);
  const [postError, setPostError] = useState(false);
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getIngredients();
    getRecipes();
  }, []);

  function getIngredients() {
    axios.get("/ingredients").then(response => setIngredients(response.data));
  }

  function addIngredientToRecipe(ingredient) {
    if (!recipeIngredients.includes(ingredient)) {
      setRecipeIngredients(prevState => [...prevState, ingredient]);
    }
  }

  function removeIngredientFromRecipe(ingredient) {
    const newIngredientsList = recipeIngredients.filter(
      eachIngredient => eachIngredient.id !== ingredient.id
    );
    setRecipeIngredients(newIngredientsList);
  }

  function saveRecipe() {
    if (isValidImageUrl(image)) {
      const recipe = {
        name: recipeName,
        ingredients: recipeIngredients,
        image: image,
      };
      axios
        .post("/recipe", recipe)
        .then(() => getRecipes())
        .catch(error => setPostError(error.response.status));
      setRecipeName("");
      setImage("");
      setRecipeIngredients("");
    } else {
      setImageError(true);
    }
  }

  function deleteRecipe(id) {
    axios.delete("/recipes/" + id).then(() => getRecipes());
  }

  function getRecipes() {
    axios
      .get("/recipes")
      .then(responses => setRecipes(responses.data))
      .catch(() =>
        setGetError(
          "Erreur serveur - Impossible de récupérer la liste des ingrédients, veuillez réessayer plus tard."
        )
      );
  }

  function describeError(error) {
    switch (error) {
      case 406:
        return "Ce nom existe déjà, veuillez en choisir un autre";
      case 500:
        return "Erreur serveur - Impossible d'enregister la recette";
      default:
        return "";
    }
  }

  function isValidImageUrl(url) {
    const extension = url.substring(url.length - 4);
    if (extension === ".jpg" || extension === ".png") {
      return true;
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
          fullWidth
          required
          label="Nom de la recette"
          value={recipeName}
          onChange={event => setRecipeName(event.target.value)}
          onFocus={() => setPostError(false)}
          error={postError}
          helperText={describeError(postError)}
        />
        <TextField
          fullWidth
          required
          label="Photo de la recette"
          value={image}
          onChange={event => setImage(event.target.value)}
          onFocus={() => setImageError(false)}
          error={imageError}
          helperText={imageError && "Lien non valide, vérifiez l'extension"}
          className={classes.input}
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
            style={{ width: "22rem" }}
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
        <Grid container item xs={10}>
          {recipeIngredients.map(ingredient => (
            <Grid item>
              <Button
                key={ingredient.id}
                onClick={() => removeIngredientFromRecipe(ingredient)}
              >
                {ingredient.name}
                <DeleteOutlineIcon fontize="small" />
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => saveRecipe()}
        disabled={!recipeName || !recipeIngredients.length > 0}
        className={classes.button}
      >
        Enregistrer la recette
      </Button>
      <Grid item container justify="center">
        {recipes
          ? recipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                deleteRecipe={deleteRecipe}
              />
            ))
          : !getError && <CircularProgress />}
        {getError && <Typography align="center">{getError}</Typography>}
      </Grid>
    </Grid>
  );
}

Recipes.propTypes = {};

export default Recipes;
