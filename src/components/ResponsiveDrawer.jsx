import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  Toolbar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ListAltIcon from "@material-ui/icons/ListAlt";
import HomeIcon from "@material-ui/icons/Home";
import AppleIcon from "@material-ui/icons/Apple";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  list: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    //backgroundColor: "transparent",
  },
  whiteMenuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  blackMenuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  selectedIcon: {
    color: "green",
  },
  link: {
    fontWeight: "400",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ResponsiveDrawer() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [itemSelected, setItemSelected] = useState();
  let history = useHistory();

  const itemsList = [
    { id: 1, name: "Home", path: "/", icon: <HomeIcon /> },
    { id: 2, name: "Ingrédients", path: "/ingredients", icon: <AppleIcon /> },
    { id: 3, name: "Recettes", path: "/recipes", icon: <ListAltIcon /> },
    {
      id: 4,
      name: "Livre de Recettes",
      path: "/cookbooks",
      icon: <MenuBookIcon />,
    },
    { id: 5, name: "Profil", path: "/profile", icon: <AccountCircleIcon /> },
  ];

  useEffect(() => {
    highlightSelectedLink();
  }, []);

  function highlightSelectedLink() {
    itemsList.forEach(
      item =>
        item.path === window.location.pathname && setItemSelected(item.name)
    );
  }

  function goToLink(item) {
    history.push(item.path);
    setMobileOpen(false);
    setItemSelected(item.name);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List className={classes.list}>
        {itemsList.map(item => (
          <Box key={item.id} my={1}>
            <ListItem button onClick={() => goToLink(item)}>
              <ListItemIcon
                className={
                  itemSelected === item.name ? classes.selectedIcon : ""
                }
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name.toUpperCase()} />
            </ListItem>
          </Box>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} elevation={1}>
        <Toolbar position="fixed" className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={
              itemSelected === "Home"
                ? classes.whiteMenuButton
                : classes.blackMenuButton
            }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            MyFood
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="links">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer anchor="top" variant="permanent" open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
