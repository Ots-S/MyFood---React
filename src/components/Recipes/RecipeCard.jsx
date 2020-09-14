import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Button, Typography, Grid, Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 275,
    height: 300,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },

  image: {
    width: "10rem",
    height: "10rem",
    objectFit: "cover",
  },
});

export default function RecipeCard({ recipe, deleteRecipe }) {
  const classes = useStyles();
  return (
    <Box mx={1}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {recipe.name}
          </Typography>
          {recipe.ingredients.map(ingredient => (
            <Typography>{ingredient.name}</Typography>
          ))}
          <img src={recipe.image} alt={recipe.name} className={classes.image} />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => deleteRecipe(recipe.id)}>
            Supprimer
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
