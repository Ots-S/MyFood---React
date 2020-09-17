import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box, Typography } from "@material-ui/core";
import CookbookCard from "./CookbookCard";
import axios from "axios";

export default function Cookbooks() {
  const [name, setName] = useState("");
  const [cookbooks, setCookbooks] = useState([{}]);
  const [errorStatus, setErrorStatus] = useState();
  const [recipes, setRecipes] = useState([{}]);

  useEffect(() => {
    getCookbooks();
    getRecipes();
  }, []);

  function getCookbooks() {
    axios.get("/cookbooks").then(responses => setCookbooks(responses.data));
  }

  function onChange(event) {
    setName(event.target.value);
  }

  function createCookbook() {
    let newCookbook = { name: name };
    axios
      .post("/cookbooks", newCookbook)
      .then(() => getCookbooks())
      .catch(error => setErrorStatus(error.response.status));
  }

  function deleteCookbook(id) {
    axios
      .delete("/cookbooks/" + id)
      .then(() => getCookbooks())
      .catch(error => setErrorStatus(error.response.status));
  }

  function getRecipes() {
    axios.get("/recipes").then(responses => setRecipes(responses.data));
  }

  function addRecipeToCookbook(cookbookId, recipeId) {
    axios
      .post("/cookbooks/" + cookbookId + "/recipe/" + recipeId)
      .then(() => getCookbooks());
  }

  function deleteRecipeFromCookbook(cookbookId, recipeId) {
    axios
      .delete("/cookbooks/" + cookbookId + "/recipe/" + recipeId)
      .then(() => getCookbooks());
  }

  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      direction="column"
      style={{ height: "100vh" }}
    >
      {errorStatus === 406 && (
        <Typography>Ce livre de recettes existe déjà</Typography>
      )}
      <TextField
        style={{ width: "20rem" }}
        value={name}
        onChange={onChange}
        label="Entrez le nom de votre livre de recettes"
        required
      />
      <Box my={2}>
        <Button onClick={createCookbook} variant="contained" color="primary">
          Créer
        </Button>
      </Box>
      <Grid item container>
        {cookbooks &&
          cookbooks.map(cookbook => (
            <CookbookCard
              key={cookbook.id}
              cookbook={cookbook}
              deleteCookbook={deleteCookbook}
              addRecipeToCookbook={addRecipeToCookbook}
              recipes={recipes}
              deleteRecipeFromCookbook={deleteRecipeFromCookbook}
            />
          ))}
      </Grid>
      {errorStatus === 304 && (
        <Typography>
          Erreur serveur - Le livre de recette n'a pas été supprimé
        </Typography>
      )}
    </Grid>
  );
}
