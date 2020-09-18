import { createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    primary: {
      main: green[800],
      contrastText: "white",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: "1rem",
        color: green[800],
        backgroundColor: green,
        textPrimary: "white",
      },
    },
  },
});
