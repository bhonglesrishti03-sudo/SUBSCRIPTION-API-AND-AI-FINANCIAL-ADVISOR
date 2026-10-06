import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { useThemeMode } from "../../context/ThemeContext";

export default function DashboardLayout({
  children,
  title,
  eyebrow,
}) {
  const { mode } = useThemeMode();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",

        background:
          mode === "dark"
            ? "linear-gradient(135deg,#08111f,#0f172a,#111827)"
            : "linear-gradient(135deg,#f8fafc,#eef2ff,#f0fdfa)",

        color: mode === "dark"
          ? "#fff"
          : "#111827",

        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <Sidebar />

      <Box
        component="main"
        sx={{
          flex: 1,

          px: {
            xs: 3,
            md: 5,
          },

          py: 4,

          overflowX: "hidden",
        }}
      >
        <Navbar
          title={title}
          eyebrow={eyebrow}
        />

        <Box mt={3}>{children}</Box>
      </Box>
    </Box>
  );
}