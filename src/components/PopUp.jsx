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

export default function PopUp({
  cookbook,
  title,
  open,
  items,
  handleOpen,
  deleteRecipeFromCookbook,
}) {
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {items &&
              items.map(item => (
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="body2" key={item.id}>
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() =>
                        deleteRecipeFromCookbook(cookbook.id, item.id)
                      }
                    >
                      X
                    </Button>
                  </Grid>
                </Grid>
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justify="center">
            <Button
              variant="outlined"
              color="primary"
              autoFocus
              onClick={handleOpen}
            >
              FERMER
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
