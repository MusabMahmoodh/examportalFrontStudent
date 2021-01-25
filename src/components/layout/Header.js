import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CloseIcon from "@material-ui/icons/Close";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AuthOptions from "../auth/AuthOptions";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/StudentContext.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
}));

export default function Header() {
  let history = useHistory();

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { userData, setUserData } = useContext(UserContext);
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: "#000000", padding: "1em" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuBookIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Quiz master
          </Typography>
          <AuthOptions />
          {userData.user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{ marginLeft: "5px" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => history.push("/scores")}>
                  <EqualizerIcon style={{ marginRight: "1.8px" }} /> My
                  performance
                </MenuItem>
                <MenuItem onClick={() => history.push("/dashboard")}>
                  <CardMembershipIcon style={{ marginRight: "1.8px" }} /> My
                  Subscriptions
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <CloseIcon style={{ margin: "auto" }} />{" "}
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
