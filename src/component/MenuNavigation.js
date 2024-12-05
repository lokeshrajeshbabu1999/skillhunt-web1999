import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

function MenuNavigation({ open, onClose, menuItems }) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{ display: { xs: "block", md: "none" } }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            component="a"
            href={item.link}
            onClick={onClose}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default MenuNavigation;
