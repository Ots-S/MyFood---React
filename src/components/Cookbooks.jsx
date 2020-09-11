import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box, Typography } from "@material-ui/core";
import axios from "axios";

export default function Cookbooks() {
  const [name, setName] = useState("");
  const [cookbooks, setCookbooks] = useState([{}]);
  const [errorStatus, setErrorStatus] = useState();

  useEffect(() => {
    getCookbooks();
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

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <h1>Créer un livre de recettes</h1>
      {errorStatus === 406 && (
        <Typography>Ce livre de recettes existe déjà</Typography>
      )}
      <TextField value={name} onChange={onChange} />
      <Box my={2}>
        <Button onClick={createCookbook} variant="contained" color="primary">
          Créer
        </Button>
      </Box>
      {cookbooks &&
        cookbooks.map(cookbook => (
          <Grid key={cookbook.id} container justify="center">
            <Typography>{cookbook.name}</Typography>
            <Button onClick={() => deleteCookbook(cookbook.id)}>X</Button>
          </Grid>
        ))}
      {errorStatus === 304 && (
        <Typography>
          Erreur serveur - Le livre de recette n'a pas été supprimé
        </Typography>
      )}
    </Grid>
  );
}
