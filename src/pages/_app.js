import { ThemeProvider } from "@mui/material";
// import "normalize.css";
import { useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import { appTheme } from "../themes/Theme";

function SkillHuntApp({ Component, pageProps }) {
  useEffect(() => {
    const trackingId =
      process.env.NEXT_APP_ENVIRONMENT === "Production"
        ? process.env.NEXT_APP_GA_TRACKING_ID_PROD
        : process.env.NEXT_APP_GA_TRACKING_ID_DEV;

    if (!trackingId) return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", trackingId);
    };
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default SkillHuntApp;
