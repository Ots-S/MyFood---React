import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import IngredientCard from "./IngredientCard";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../Input";
import { Context } from "../../Context"

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

export default function Ingredients() {
  const { getIngredients, ingredients, getError } = useContext(Context)
  const [ingredient, setIngredient] = useState("");
  const [image, setImage] = useState("");
  const [postError, setPostError] = useState(false);
  const [imageError, setImageError] = useState(false);
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

  function saveIngredient() {
    if (isValidImageUrl(image)) {
      const newIngredient = { name: ingredient, image: image };
      axios
        .post("/ingredient", newIngredient)
        .then(() => {
          getIngredients();
        })
        .catch(error => setPostError(error.response.status));
      setIngredient("");
      setImage("");
    } else {
      setImageError(true);
    }
  }

  function deleteIngredient(id) {
    axios.delete("/ingredient/" + id).then(() => {
      getIngredients();
    });
  }

  function isValidImageUrl(url) {
    const extension = url.substring(url.length - 4);
    if (extension === ".jpg" || extension === ".png") {
      return true;
    }
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

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid container item xs={10} sm={8} md={6} lg={3}>
        <Input
          label="Entrez le nom d'un ingrédient"
          value={ingredient}
          onChange={onChange}
          onFocus={() => setPostError(false)}
          error={postError}
          helperText={postError && describeError(postError)}
        />
        <Input
          label="Entrez le lien d'une image (.jpg ou .png)"
          value={image}
          onChange={onChangeImage}
          onFocus={() => setImageError(false)}
          error={imageError}
          helperText={imageError && "Lien non valide, vérifiez l'extension"}
          className={classes.input}
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
      {ingredients.length > 0 ? (
        <Grid container spacing={1} item xs={11} md={10} lg={6}>
          {ingredients.map(ingredient => (
            <Grid item xs={4} md={4} lg={3} key={ingredient.id}>
              <IngredientCard
                ingredient={ingredient}
                deleteIngredient={deleteIngredient}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
          <Box mt={25}>{!getError && <CircularProgress color="primary" />}</Box>
        )}
      <Grid item>
        {getError && (<Box mx={2}>
          <Typography align="center">{describeError(getError)}</Typography>
        </Box>)}
      </Grid>
    </Grid>
  );
}
