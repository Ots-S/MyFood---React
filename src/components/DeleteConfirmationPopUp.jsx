import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  DialogTitle,
  Typography,
} from "@material-ui/core";

export default function DeleteConfirmationPopUp({
  open,
  handleOpen,
  deleteElement,
  item,
}) {
  function deleteIngredientAndCloseModal() {
    handleOpen();
    deleteElement(item.id);
  }

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title" align="center">
          Êtes-vous sûr de vouloir supprimer cet ingrédient ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-around">
            <Button
              color="primary"
              variant="contained"
              autoFocus
              onClick={deleteIngredientAndCloseModal}
            >
              SUPPRIMER
            </Button>
            <Button color="primary" autoFocus onClick={handleOpen}>
              ANNULER
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
