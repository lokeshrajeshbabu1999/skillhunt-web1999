import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LoadingButton } from "@mui/lab"; // Import LoadingButton from MUI Lab
import { CircularProgress, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthAction = () => {
  const { authState, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loadingButton, setLoadingButton] = useState(""); // Track which button is loading
  const router = useRouter();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = async (buttonType, action) => {
    setLoadingButton(buttonType); // Start loading for the clicked button
    await action(); // Perform the action (navigation or logout)
    setLoadingButton(""); // Reset loading state after the action
  };

  const navigateToSignIn = () => handleButtonClick("signin", () => router.push("/account/signin"));
  const navigateToSignUp = () => handleButtonClick("signup", () => router.push("/account/signup"));
  const handleSignOut = () => handleButtonClick("signout", logout);

  return (
    <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
      {!authState.isAuthenticated ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <LoadingButton
            variant="outlined"
            color="inherit"
            onClick={navigateToSignIn}
            loading={loadingButton === "signin"} // Loading state based on pressed button
          >
            Sign In
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            color="inherit"
            onClick={navigateToSignUp}
            loading={loadingButton === "signup"}
          >
            Sign Up
          </LoadingButton>
        </div>
      ) : (
        <>
          <LoadingButton
            color="inherit"
            sx={{ mr: 2, cursor: "pointer", textTransform: "none" }}
            onClick={handleSignOut}
            loading={loadingButton === "signout"}
          >
            Sign Out
          </LoadingButton>

          <AccountCircleIcon
            sx={{ cursor: "pointer" }}
            fontSize="large"
            color="inherit"
            onClick={handleProfileClick}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              {authState.user?.username || "Profile"}
            </MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};

export default AuthAction;
