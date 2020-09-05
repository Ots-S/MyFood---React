import React from "react";
import { Drawer as MUIDrawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ListAltIcon from "@material-ui/icons/ListAlt";
import HomeIcon from "@material-ui/icons/Home";
import AppleIcon from "@material-ui/icons/Apple";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles({
  menu: {
    width: "13rem",
  },
});

export default function Drawer() {
  const classes = useStyles();
  let history = useHistory();
  const itemsList = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Ingrédients", path: "/ingredients", icon: <AppleIcon /> },
    { name: "Recettes", path: "/recipes", icon: <ListAltIcon /> },
    { name: "Livre de Recettes", path: "/cookbook", icon: <MenuBookIcon /> },
    { name: "Profil", path: "/user", icon: <AccountCircleIcon /> },
  ];

  return (
    <MUIDrawer variant="permanent" className={classes.menu}>
      <Divider />
      <List>
        {itemsList.map(item => (
          <Box my={5} key={item.name} onClick={() => history.push(item.path)}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Box>
        ))}
      </List>
    </MUIDrawer>
  );
}
