import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function WelcomeHero() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const firstName = user?.name?.split(" ")[0] || "Sri";

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "28px",
        p: { xs: 4, md: 5 },
        minHeight: 250,

        background:
          "linear-gradient(135deg,#ff6b6b 0%,#ff8e53 40%,#14b8a6 100%)",

        color: "#fff",
      }}
    >
      {/* Decorative Blur */}
      <Box
        sx={{
          position: "absolute",
          right: -70,
          top: -70,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(255,255,255,.15)",
          filter: "blur(10px)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -60,
          left: -60,
          width: 170,
          height: 170,
          borderRadius: "50%",
          background: "rgba(255,255,255,.08)",
        }}
      />

      <Typography
        sx={{
          opacity: .9,
          fontWeight: 600,
          mb: 1,
          letterSpacing: ".05em",
        }}
      >
        {getGreeting()}
      </Typography>

      <Typography
        sx={{
          fontSize: {
            xs: 32,
            md: 42,
          },
          fontWeight: 800,
          lineHeight: 1.1,
          maxWidth: 600,
        }}
      >
        Welcome back,
        <br />
        {firstName} 👋
      </Typography>

      <Typography
        sx={{
          mt: 2,
          maxWidth: 500,
          fontSize: 16,
          opacity: .95,
          lineHeight: 1.7,
        }}
      >
        Manage your subscriptions, track upcoming renewals,
        and receive AI-powered financial insights—all in one place.
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        mt={4}
        flexWrap="wrap"
      >
        <Chip
          icon={<TrendingUpRoundedIcon />}
          label="12 Active Plans"
          sx={{
            bgcolor: "rgba(255,255,255,.18)",
            color: "#fff",
            fontWeight: 600,
            backdropFilter: "blur(10px)",
          }}
        />

        <Chip
          icon={<AutoAwesomeRoundedIcon />}
          label="₹620 Saved"
          sx={{
            bgcolor: "rgba(255,255,255,.18)",
            color: "#fff",
            fontWeight: 600,
            backdropFilter: "blur(10px)",
          }}
        />
      </Stack>

      <Button
        variant="contained"
        endIcon={<ArrowForwardRoundedIcon />}
          onClick={() => navigate("/subscriptions")}

        sx={{
          mt: 4,
          px: 4,
          py: 1.5,
          borderRadius: "14px",

          textTransform: "none",
          fontWeight: 700,

          bgcolor: "#fff",
          color: "#111827",

          "&:hover": {
            bgcolor: "#f3f4f6",
          },
        }}
      >
        View All Subscriptions
      </Button>
    </Box>
  );
}