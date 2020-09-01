import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import axios from "axios";

export default function Ingredients() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients();
  }, []);

  function onChange(event) {
    setIngredient(event.target.value);
  }

  function getIngredients() {
    axios.get("/ingredients").then(response => setIngredients(response.data));
  }

  function saveIngredient(ingredient) {
    const newIngredients = [...ingredients, ingredient];
    setIngredients(newIngredients);
    axios.post("/ingredient", { name: ingredient });
  }

  function deleteIngredient(id) {
    const newIngredients = ingredients.filter(
      ingredient => ingredient.id !== id
    );
    setIngredients(newIngredients);
    axios.delete("/ingredient/" + id);
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
      <Grid item>
        <h2>Ingrédients :</h2>
        {ingredients && (
          <ul>
            {ingredients.map(ingredient => (
              <li key={ingredient.id}>
                {ingredient.name}{" "}
                <Button onClick={() => deleteIngredient(ingredient.id)}>
                  X
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Grid>
    </Grid>
  );
}
