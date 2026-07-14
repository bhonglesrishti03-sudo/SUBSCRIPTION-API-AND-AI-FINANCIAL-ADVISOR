import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
    secondary: {
      main: "#7c3aed",
    },
    background: {
      default: "#f5f7fb",
      paper: "#ffffff",
    },
  },
 typography: {
  fontFamily: "'Inter', 'Roboto', sans-serif",
  h4: {
    fontWeight: 700,
  },
  h6: {
    fontWeight: 600,
  },
},

  shape: {
    borderRadius: 12,
  },
});

export default theme;