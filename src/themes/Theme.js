import { lightGreen, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: teal,
    secondary: lightGreen,
    guideLink: {
      primary: teal[500],  
    },
    // background: {
    //   default: "#ffffff",
    //   color: purple[500],
    //   tools: "#e69de6",
    // },
    text: {
      primary: "#000000",
      tertiary: "#ffffff",

      secondary: "#000000",
      // tertiary: grey[500],
      // color: purple[500],
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "#653452",
        },
      },
    },
  },
});

export { appTheme };
