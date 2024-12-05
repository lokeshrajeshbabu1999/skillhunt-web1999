import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Menu } from "@mui/material";
import React, { useState } from "react";

const navItems = ["Home", "Course"];

function SideNavigation() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* {navItems.map((navItem) => (
          <MenuItem
            key={navItem}
            component={Link}
            to={`/${navItem.toLowerCase()}`}
            onClick={handleMenuClose}
          >
            {navItem}
          </MenuItem>
        ))} */}
      </Menu>
    </React.Fragment>
  );
}

export default SideNavigation;
