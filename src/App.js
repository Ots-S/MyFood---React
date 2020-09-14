import React from "react";
import "./App.css";
import Home from "./components/Home";
import Drawer from "./components/Drawer";
import Ingredients from "./components/Ingredients/Ingredients";
import Recipes from "./components/Recipes/Recipes";
import Cookbooks from "./components/Cookbooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Router>
        <Drawer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/ingredients" component={Ingredients} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/cookbooks" component={Cookbooks} />
        </Switch>
      </Router>
    </div>
  );
}
