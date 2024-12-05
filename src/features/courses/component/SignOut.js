import { Typography } from "@mui/material";
import React from "react";
import Layout from "../../../component/Layout";

function SignOut({ signOut }) {
  return (
    <Typography component="span">
      <Layout signOut={signOut} />
    </Typography>
  );
}

export default SignOut;
