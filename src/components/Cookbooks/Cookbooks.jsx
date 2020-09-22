import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import CookbookCard from "./CookbookCard";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import PopUp from "../PopUp";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "5rem",
    [theme.breakpoints.up("sm")]: {
      marginTop: "6rem",
    },
  },
}));

export default function Cookbooks() {
  const [name, setName] = useState("");
  const [cookbooks, setCookbooks] = useState();
  const [getError, setGetError] = useState();
  const [postError, setPostError] = useState();
  const [deleteError, setDeleteError] = useState();
  const [addError, setAddError] = useState();
  const [recipes, setRecipes] = useState([{}]);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getCookbooks();
    getRecipes();
  }, []);

  function getCookbooks() {
    axios
      .get("/cookbooks")
      .then(responses => setCookbooks(responses.data))
      .catch(error => setGetError(error.response.status));
  }

  function onChange(event) {
    setName(event.target.value);
  }

  function createCookbook() {
    let newCookbook = { name: name };
    axios
      .post("/cookbooks", newCookbook)
      .then(() => getCookbooks())
      .catch(error => setPostError(error.response.status));
  }

  function deleteCookbook(id) {
    axios
      .delete("/cookbooks/" + id)
      .then(() => getCookbooks())

      .catch(error =>
        setDeleteError(
          "Erreur serveur - Le livre de recette n'a pas été supprimé, veuillez réesayer plus tard"
        )
      );
  }

  function getRecipes() {
    axios.get("/recipes").then(responses => setRecipes(responses.data));
  }

  async function addRecipeToCookbook(cookbookId, recipeId) {
    try {
      const response = await axios.post(
        "/cookbooks/" + cookbookId + "/recipe/" + recipeId
      );
      if (response) {
        getCookbooks();
        setConfirmationModal(true);
      }
    } catch (error) {
      setAddError(true);
    }
  }

  function deleteRecipeFromCookbook(cookbookId, recipeId) {
    axios
      .delete("/cookbooks/" + cookbookId + "/recipe/" + recipeId)
      .then(() => getCookbooks());
  }

  function describeError(error) {
    switch (error) {
      case 406:
        return "Ce nom existe déjà, veuillez en choisir un autre.";
      case 500:
        return "Erreur serveur - Impossible d'afficher ou d'envoyer des données, veuillez réessayer plus tard.";
      default:
        return "";
    }
  }

  function handleOpen() {
    setConfirmationModal(prevState => !prevState);
  }

  function handleOpenError() {
    setAddError(prevState => !prevState);
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid container item xs={10} sm={8} md={6} lg={3}>
        <TextField
          fullWidth
          required
          label="Entrez le nom de votre livre de recettes"
          value={name}
          onChange={onChange}
          onFocus={() => setPostError(false)}
          error={postError}
          helperText={describeError(postError)}
        />
      </Grid>
      <Box my={2}>
        <Button onClick={createCookbook} variant="contained" color="primary">
          Créer
        </Button>
      </Box>

      <Grid container spacing={1} item xs={11} md={10} lg={6} s>
        {cookbooks ? (
          cookbooks.map(cookbook => (
            <Grid item lg={6}>
              <CookbookCard
                key={cookbook.id}
                cookbook={cookbook}
                deleteCookbook={deleteCookbook}
                addRecipeToCookbook={addRecipeToCookbook}
                recipes={recipes}
                deleteRecipeFromCookbook={deleteRecipeFromCookbook}
              />
            </Grid>
          ))
        ) : (
          <Box mt={25}>{!getError && <CircularProgress />}</Box>
        )}
      </Grid>
      {deleteError && <Typography align="center">{deleteError}</Typography>}
      {getError && (
        <Typography align="center">{describeError(getError)}</Typography>
      )}
      {confirmationModal && (
        <PopUp
          open={confirmationModal}
          handleOpen={handleOpen}
          title={"La recette a bien été ajoutée"}
        />
      )}
      {addError && (
        <PopUp
          open={addError}
          handleOpen={handleOpenError}
          title={"La recette est déjà présente dans le livre de recette"}
        />
      )}
    </Grid>
  );
}
