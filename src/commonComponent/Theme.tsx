import * as React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
const Theme = createTheme({
  typography: {
    h2: {
      fontSize: 36,
    },
  },
  palette: {
    primary: {
      main: "#F25530",
      // main: "#17ad9c",
    },
    secondary: {
      // main: "#FF0000",
      main: "#F25530",
    },
    error: {
      main: "#F25530",
    },
    background: {
      default: "#F25530",
      // default: "#17ad9c",
    },
    // overrides: {
    //   MuiAppBar: {
    //     root: {
    //       transform: "translateZ(0)",
    //     },
    //   },
    // },
    // props: {
    //   MuiIconButton: {
    //     disableRipple: true,
    //   },
    // },
  },
});

export default Theme;
