//* eslint-disable import/no-mutable-exports */
import { createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    hover?: string;
    success?: string;
  }
  interface SimplePaletteColorOptions {
    hover?: string;
    success?: string;
  }
}
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#04165D",
      light: "#EDF5FF",
      hover: "#0726A1",
      success: "#008000",
    },
    secondary: {
      main: "#DB5B90",
      hover: "#EF74A9",
    },
    grey: {
      100: "#F8F9FB",
      200: "#ECEEF7",
      300: "#D1D1D1",
      400: "#4E4E4E",
      500: "#777777",
      600: "#949494",
      700: "#DCDCDC",
    },
    text: {
      primary: "#000000",
      secondary: "#949494",
      disabled: "#C2C9D1",
    },
    success: {
      main: "#65B168",
      light: "#EDF6EE",
    },
    error: {
      main: "#FC5050",
      light: "#FFEFEF",
    },
    warning: {
      main: "#FC8019",
      light: "#FDF8EB",
    },
    info: {
      main: "#2E6ADD",
      light: "#E7EFF9",
    },
    background: {
      default: "#F4F5F7",
    },
  },
  spacing: 8,
  typography: {
    htmlFontSize: 13,
    fontSize: 13,
    fontFamily: [
      "Roboto",
      "Rubik",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: "13px",
        },
        body: {
          fontSize: "1rem",
        },
      },
    },
    // Name of the component
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        input: {
          boxSizing: "border-box",
          height: 34,
        },
        root: {
          boxSizing: "border-box",
          fontSize: "1rem",
        },
        multiline: {
          height: "auto !important",
          lineHeight: "1.4",
        },
        inputMultiline: {
          height: "auto",
          lineHeight: "1.4",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          boxSizing: "border-box",
          // height: '34px',
          height: "54px",
          "&.MuiInputBase-multiline": {
            height: "auto !important",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          boxSizing: "border-box",
          // height: '34px',
          height: "54px",
          lineHeight: "34px",
          borderRadius: "6px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          textTransform: "capitalize",
          boxSizing: "border-box",
          height: "34px",
          lineHeight: "34px",
          paddingLeft: "8px",
          paddingRight: "8px",
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        // Name of the slot
        select: {
          boxSizing: "border-box",
          height: 34,
          lineHeight: "34px",
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          height: "auto",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "13px",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          maxWidth: "calc(100% - 12px)",
          width: "150px",
          xs: { top: "55px" },
        },
      },
    },
  },
});
export default theme;
