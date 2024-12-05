// ShowInterest.js
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export default function ShowInterest({ handleClickShowInterest, loading }) {
  return (
    <Box
      component="section"
      sx={{
        height: "100%",
        borderColor: "primary.main",
        borderWidth: "1px",
        borderStyle: "solid",
        p: 2,
      }}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography align="center" component="span">
          There are currently no scheduled sessions for this course. Please let
          us know if you're interested, and we'll keep you updated on future
          availability.
        </Typography>
        <LoadingButton
          variant="contained"
          color="primary"
          sx={{ alignSelf: "center", marginTop: "10px" }}
          onClick={handleClickShowInterest}
          loading={loading}
        >
          Show Interest
        </LoadingButton>
      </Stack>
    </Box>
  );
}
