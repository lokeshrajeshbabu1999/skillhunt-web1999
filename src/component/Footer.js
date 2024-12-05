import { Alert, Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";

function CopyRights() {
  return (
    <Box color="primary.contrastText">
      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        <Typography>CopyRights @2023 Codrix</Typography>
        <DevelopmentMode></DevelopmentMode>
      </Stack>
    </Box>
  );
}

function DevelopmentMode() {
  return (
    <>
      {process.env.NEXT_APP_ENVIRONMENT === "Development" && (
        <Alert severity="warning">****** Dev Mode *****</Alert>
      )}
    </>
  );
}

const Footer = () => {
  return (
    <Box
      backgroundColor="primary.main"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        textAlign: "center",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <CopyRights />
      </Grid>
      {/* <Stack textAlign="center">
        <a
          href="https://play.google.com/store/apps/details?id=com.codrix.skill"
          onClick={() => handleButtonClick("playstore")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="Get it on Google Play"
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            style={{
              width: "150px",
              height: "50px",
              display: "block",
              margin: "auto",
            }}
          />
        </a>
      </Stack> */}
    </Box>
  );
};

export default Footer;
