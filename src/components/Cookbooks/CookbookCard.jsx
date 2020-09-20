import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import {
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles({ root: { width: "100%" } });

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
    <Card className={classes.root}>
      <Grid container item justify="center">
        <CardContent>
          <Typography color="primary" variant="h5" component="h2">
            {cookbook.name}
          </Typography>
        </CardContent>
        <Grid container justify="center" item xs={12}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Ajouter une recette
            </InputLabel>
            <Select
              style={{ width: "15rem" }}
              label="Ajouter une recett"
              id="demo-simple-select"
              value={recipe}
              onChange={handleChange}
            >
              {recipes.map(recipe => (
                <MenuItem key={recipe.id} value={recipe}>
                  {recipe.name}
                </MenuItem>
              ))}
            </Select>
            <CardActions>
              <Button
                fullWidth
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => addRecipeToCookbook(cookbook.id, recipe.id)}
              >
                Ajouter
              </Button>
            </CardActions>
          </FormControl>
        </Grid>
        <CardActions>
          <Button onClick={() => deleteCookbook(cookbook.id)}>
            <FormatListBulletedIcon />
          </Button>
          <Button onClick={() => deleteCookbook(cookbook.id)}>
            <DeleteOutlineIcon />
          </Button>
        </CardActions>
      </Grid>
    </Card>
  );
}

CookbookCard.propTypes = {
  cookbook: PropTypes.object.isRequired,
  deleteCookbook: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
  addRecipeToCookbook: PropTypes.func.isRequired,
  deleteRecipeFromCookbook: PropTypes.func.isRequired,
};
