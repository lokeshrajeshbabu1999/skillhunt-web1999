import { Box, Button, Toolbar, useMediaQuery } from "@mui/material";
import React from "react";
import { appTheme } from "../themes/Theme"; // Import appTheme instead of theme
import Link from "next/link";

function TopNavigation({ menuItems }) {
  const mlScreen = useMediaQuery("(min-width:960px)");

  return (
    <Toolbar>
      {mlScreen && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          {menuItems.map((navItem) => (
              <Link key={navItem.text} href={navItem.link} passHref>
              <Button
                component="span" 
                sx={{
                  color: appTheme.palette.text.tertiary,
                  // "&:hover": {
                  //   color: appTheme.palette.text.secondary,
                  // },
                  marginRight: "20px",
                }}
              >
                {navItem.text}
              </Button>
            </Link>
          ))}
        </Box>
      )}
    </Toolbar>
  );
}

export default TopNavigation;
