/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface IProgress {
  progress: Number;
}

// Define the initial state using that type
const initialState: IProgress = {
  progress: 0,
};

const ProgressSlice = createSlice({
  name: "Progress",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload.progress;
    },
  },
});

export default ProgressSlice.reducer;

export const { setProgress } = ProgressSlice.actions;
