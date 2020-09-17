import React from "react";
import "./App.css";
import Home from "./components/Home";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import Ingredients from "./components/Ingredients/Ingredients";
import Recipes from "./components/Recipes/Recipes";
import Cookbooks from "./components/Cookbooks/Cookbooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <Router>
          <ResponsiveDrawer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/ingredients" component={Ingredients} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/cookbooks" component={Cookbooks} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}
