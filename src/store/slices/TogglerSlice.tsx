/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface IDefaultLogin {
  drawerOpen: boolean;
  message: string;
}

interface TogglerState {
  defaultLoginData: IDefaultLogin;
}

// Define the initial state using that type
const initialState: TogglerState = {
  defaultLoginData: JSON.parse(localStorage.getItem("toggler") || "{}") || null,
};

const togglerSlice = createSlice({
  name: "toggler",
  initialState,
  reducers: {
    toggleLoginDrawer: (state, action) => {
      state.defaultLoginData = {
        ...state.defaultLoginData,
        drawerOpen: action.payload.open,
      };
      localStorage.setItem(
        "toggler",
        JSON.stringify({
          drawerOpen: action.payload.open,
          message: action.payload.open ? "Please Log In First!" : "",
        })
      );
    },
  },
});

export default togglerSlice.reducer;

export const { toggleLoginDrawer } = togglerSlice.actions;
