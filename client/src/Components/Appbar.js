import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [burgerAnchorEl, setBurgerAnchorEl] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [
    mobileMoreBurgerAnchorEl,
    setMobileMoreBurgerAnchorEl,
  ] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isBurgerMenuOpen = Boolean(burgerAnchorEl);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMobileBurgerMenuOpen = Boolean(mobileMoreBurgerAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBurgerMenuOpen = (event) => {
    setBurgerAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileBurgerMenuClose = () => {
    setMobileMoreBurgerAnchorEl(null);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    props.setLandingPage(e.target.id);
    props.setErrorMessage("");
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    axios({
      method: "get",
      url: "api/v1/users/logout",
    })
      .then(() => {
        props.setUserName("");
        props.setSignedIn(false);
        props.setErrorMessage("You are successfully signed out");
        props.setLandingPage("signin");
      })
      .catch(() => {
        props.setSignedIn(true);
        props.setErrorMessage("Something went wrong !");
        props.setLandingPage("grid");
      });
  };
  const handleBurgerMenuClose = (e) => {
    setBurgerAnchorEl(null);
    handleMobileBurgerMenuClose();
    if (props.isSignedIn) {
      props.setLandingPage(e.target.id);
    } else {
      props.setErrorMessage(
        "You are not Signed in! Please Sign in to continue"
      );
      props.setLandingPage("signin");
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const handleMobileBurgerMenuOpen = (event) => {
  //   setMobileMoreBurgerAnchorEl(event.currentTarget);
  // };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!props.isSignedIn && (
        <MenuItem id="signin" onClick={handleMenuClose}>
          Sign In
        </MenuItem>
      )}
      {!props.isSignedIn && (
        <MenuItem id="signup" onClick={handleMenuClose}>
          Sign Up
        </MenuItem>
      )}
      {props.isSignedIn && (
        <MenuItem id="hi">{`Hi, ${props.userName}`}</MenuItem>
      )}

      {props.isSignedIn && (
        <MenuItem id="signout" onClick={handleSignOut}>
          Sign Out
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle fontSize="large" />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  //Burger Menu items
  const BurgerMenuId = "primary-search-burger-menu";
  const renderBurgerMenu = (
    <Menu
      anchorEl={burgerAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={BurgerMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isBurgerMenuOpen}
      onClose={handleBurgerMenuClose}
    >
      <MenuItem id="addRestaurant" onClick={handleBurgerMenuClose}>
        Add Restaurant
      </MenuItem>
      <MenuItem id="updateRestaurant" onClick={handleBurgerMenuClose}>
        Update Restaurant
      </MenuItem>
    </Menu>
  );

  const mobileBurgerMenuId = "primary-search-Burger-menu-mobile";
  const renderMobileBurgerMenu = (
    <Menu
      anchorEl={mobileMoreBurgerAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileBurgerMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileBurgerMenuOpen}
      onClose={handleMobileBurgerMenuClose}
    >
      <MenuItem onClick={handleBurgerMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-burger-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle fontSize="large" />
        </IconButton>
      </MenuItem>
    </Menu>
  );
  //End Burger Menu items

  return (
    <div className={classes.grow}>
      {renderMobileBurgerMenu}
      {renderBurgerMenu}
      <AppBar position="static">
        <Toolbar>
          {/* Starting Burger Menu */}

          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleBurgerMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleBurgerMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>

          {/* Ending Burger Menu */}

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            SC Eats
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search not yet ready…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
