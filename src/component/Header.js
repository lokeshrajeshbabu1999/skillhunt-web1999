import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Auth, Hub } from "aws-amplify";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthAction from "./AuthAction";
import MenuNavigation from "./MenuNavigation";
import TopNavigation from "./TopNavigation";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { login } = useContext(AuthContext);

  const mlScreen = useMediaQuery("(min-width:960px)");

  const checkAuthStatus = useCallback(async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      login(user);
    } catch (error) {}
  }, [login]);

  const listener = useCallback(
    (data) => {
      switch (data.payload.event) {
        case "signIn":
          checkAuthStatus();
          break;
        case "signOut":
          checkAuthStatus();
          break;
        default:
          break;
      }
    },
    [checkAuthStatus]
  );

  useEffect(() => {
    checkAuthStatus();
    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, [checkAuthStatus, listener]);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const menuItems = [
    { text: "Courses", link: "/" },
    { text: "Guides", link: "/guide/list" },
    // { text: "Schedule", link: "/schedule/list" },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        zIndex: 999,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Grid
            container
            direction="row"
            justifyContent={mlScreen ? "flex-start" : "center"}
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            <Typography
              variant="h6"
              component="span"
              style={{ color: "white" }}
            >
              <Link
                href="/"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Skill Hunt
              </Link>
            </Typography>
            <TextField
              variant="filled"
              placeholder="Search..."
              size="small"
              sx={{ display: { xs: "none", md: "none", marginLeft: "40px" } }}
              value={searchValue || ""}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 28 }} />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <TopNavigation menuItems={menuItems} />
            </Box>
          </Grid>
          <AuthAction />
        </Toolbar>
      </AppBar>

      <MenuNavigation
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        menuItems={menuItems}
      />
    </Box>
  );
};

export default Header;
