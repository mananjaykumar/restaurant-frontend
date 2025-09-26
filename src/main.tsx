import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import store from "./store";
import theme from "./theme";
import axios from "axios";
import { logout } from "./store/slices/AuthSlice";
import "./index.css";
import App from "./App.tsx";
import { Analytics } from "@vercel/analytics/react";

const { dispatch } = store; // direct access to redux store.
axios.interceptors.request.use(
  (request) => {
    request.headers["Authorization"] = `Bearer ${
      store?.getState()?.auth?.userData?.token
    }`;
    request.headers["Name"] = store?.getState()?.auth?.userData?.name;
    request.headers["Role"] = store?.getState()?.auth?.userData?.role;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 403) {
      dispatch(logout());
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Analytics />
          <Toaster />
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
