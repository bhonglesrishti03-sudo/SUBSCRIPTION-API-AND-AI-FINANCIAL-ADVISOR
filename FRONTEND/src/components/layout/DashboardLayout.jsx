import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
  title,
  eyebrow,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",

        background:
"linear-gradient(135deg,#08111f,#0f172a,#111827)",

        color: "#fff",
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