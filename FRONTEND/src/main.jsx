import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

import App from "./App";

import {
  ThemeProvider,
  useThemeMode,
} from "./context/ThemeContext";

function AppTheme() {
  const { theme } = useThemeMode();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" />
      <App />
    </MuiThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AppTheme />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);