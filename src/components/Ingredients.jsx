import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import axios from "axios";
import IngredientContainer from "./IngredientContainer";

export default function Ingredients() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([{}]);

  useEffect(() => {
    getIngredients();
  }, []);

  function onChange(event) {
    setIngredient(event.target.value);
  }

  async function getIngredients() {
    const response = await axios.get("/ingredients");
    const data = await response.data;
    setIngredients(data);
  }

  function saveIngredient(ingredient) {
    axios.post("/ingredient", { name: ingredient }).then(() => {
      getIngredients();
    });
  }

  function deleteIngredient(id) {
    axios.delete("/ingredient/" + id).then(() => {
      getIngredients();
    });
  }

  return (
    <Grid container direction="column" alignItems="center">
      <h1>Ingrédients</h1>
      <Grid item>
        <TextField
          style={{ width: "20rem" }}
          fullWidth
          label="Entrez le nom d'un ingrédient"
          value={ingredient}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <Box my={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => saveIngredient(ingredient)}
          >
            Valider
          </Button>
        </Box>
      </Grid>
      <Grid container justify="center">
        {ingredients && (
          <Grid container justify="center" item xs={6}>
            {ingredients.map(ingredient => (
              <IngredientContainer
                key={ingredient.key}
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
