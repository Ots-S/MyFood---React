import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {
  Button,
  Typography,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 275,
    minHeight: 300,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CookbookCard({
  cookbook,
  deleteCookbook,
  recipes,
  addRecipeToCookbook,
  deleteRecipeFromCookbook,
}) {
  const classes = useStyles();
  const [recipe, setRecipe] = useState({});

  function handleChange(event) {
    setRecipe(event.target.value);
  }
  return (
    <Box m={1}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Cookbook
          </Typography>
          <Typography variant="h5" component="h2">
            {cookbook.name}
          </Typography>
        </CardContent>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            Ajouter une recette
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={recipe}
            onChange={handleChange}
            style={{ width: "20rem" }}
          >
            {recipes.map(recipe => (
              <MenuItem key={recipe.id} value={recipe}>
                {recipe.name}
              </MenuItem>
            ))}
          </Select>
          <CardActions>
            <Button
              size="small"
              onClick={() => addRecipeToCookbook(cookbook.id, recipe.id)}
            >
              Ajouter
            </Button>
          </CardActions>
        </FormControl>
        <CardActions>
          <Button size="small" onClick={() => deleteCookbook(cookbook.id)}>
            Supprimer
          </Button>
        </CardActions>
        {cookbook.recipes &&
          cookbook.recipes.map(recipe => (
            <Grid key={recipe.id} item container>
              <Typography>{recipe.name}</Typography>
              <Button
                onClick={() => deleteRecipeFromCookbook(cookbook.id, recipe.id)}
              >
                X
              </Button>
            </Grid>
          ))}
      </Card>
    </Box>
  );
}

CookbookCard.propTypes = {
  cookbook: PropTypes.object.isRequired,
  deleteCookbook: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
  addRecipeToCookbook: PropTypes.func.isRequired,
  deleteRecipeFromCookbook: PropTypes.func.isRequired,
};
