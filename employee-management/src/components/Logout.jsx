import React, { useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { AccountCircle, Delete } from "@mui/icons-material";

import { getAuth, signOut } from "firebase/auth"; //To hanlde Signout
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        //Sign-out successfull
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error during logout: ", error);
      });
  };

  return (
    <div>
      {auth && (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle
              sx={{
                fontSize: 40, // Custom font size to make the icon larger
                padding: 1, // Additional padding
              }}
            />
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
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}

export default Logout;
