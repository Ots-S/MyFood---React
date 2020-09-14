import React, { useState, useEffect } from "react";
import { Drawer as MUIDrawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Hidden,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ListAltIcon from "@material-ui/icons/ListAlt";
import HomeIcon from "@material-ui/icons/Home";
import AppleIcon from "@material-ui/icons/Apple";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  list: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  listItem: {
    width: "15rem",
  },
  logoContainer: {
    color: "green",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Drawerr() {
  const classes = useStyles();
  let history = useHistory();
  const itemsList = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Ingrédients", path: "/ingredients", icon: <AppleIcon /> },
    { name: "Recettes", path: "/recipes", icon: <ListAltIcon /> },
    { name: "Livre de Recettes", path: "/cookbooks", icon: <MenuBookIcon /> },
    { name: "Profil", path: "/user", icon: <AccountCircleIcon /> },
  ];
  const [itemSelected, setItemSelected] = useState();
  const [mobileOpen, setMobileOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    itemsList.forEach(
      item =>
        item.path === window.location.pathname && setItemSelected(item.name)
    );
  }, []);

  function handleClick(item) {
    history.push(item.path);
    setItemSelected(item.name);
  }

  console.log("window.location.pathname", window.location.pathname);

  return (
    <div>
      <Hidden xsDown>
        <MUIDrawer variant="permanent" className={classes.menu} anchor="top">
          <List className={classes.list}>
            {itemsList.map(item => (
              <Box mx={4} key={item.name} onClick={() => handleClick(item)}>
                <ListItem button className={classes.listItem}>
                  <ListItemIcon
                    className={
                      itemSelected === item.name && classes.logoContainer
                    }
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Box>
            ))}
          </List>
        </MUIDrawer>
      </Hidden>
      <Hidden smUp>
        <MUIDrawer
          variant="temporary"
          anchor="left"
          className={(classes.menu, classes.toolbar)}
          anchor="top"
          open={mobileOpen}
        >
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                MyFood
              </Typography>
            </Toolbar>
          </AppBar>
          <List className={classes.list}>
            {itemsList.map(item => (
              <Box mx={4} key={item.name} onClick={() => handleClick(item)}>
                <ListItem button className={classes.listItem}>
                  <ListItemIcon
                    className={
                      itemSelected === item.name && classes.logoContainer
                    }
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Box>
            ))}
          </List>
        </MUIDrawer>
      </Hidden>
    </div>
  );
}
