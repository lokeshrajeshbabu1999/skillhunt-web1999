import { Box } from "@mui/material";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ signOut, children }) => {
  return (
    <Box>
      <Header signOut={signOut} />
      <Box
        sx={{
          minHeight: "calc(100vh - 60px - 70px)",
          marginTop: 10,
          marginBottom: 10,
          overflowY: "scroll",
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
