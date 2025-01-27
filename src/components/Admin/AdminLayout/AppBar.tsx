import { styled } from "@mui/material/styles";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const drawerWidth = 240;
// const drawerWidth = 320;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: 1000,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "0 15px 40px -20px rgba(40,44,63,.15)",
  backgroundColor: "#fff",
  padding: "20px",
  height: "90px",
  color: "#3d4152",
  position: "fixed",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
