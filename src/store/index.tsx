import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import togglerSlice from "./slices/TogglerSlice";
import ProgressSlice from "./slices/ProgressSlice";
import searchSlice from "./slices/SearchSlice";

const store = configureStore({
  // root reducer
  reducer: {
    auth: authSlice,
    toggle: togglerSlice,
    progress: ProgressSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
