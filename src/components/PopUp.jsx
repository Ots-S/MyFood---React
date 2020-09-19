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

export default function PopUp({ open, items, handleOpen }) {
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{"Liste des ingrédients"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {items.map(item => (
              <Typography variant="body2" key={item.id}>
                {item.name}
              </Typography>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justify="center">
            <Button color="primary" autoFocus onClick={handleOpen}>
              FERMER
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
