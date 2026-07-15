import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import {
  AddCircleOutlineRounded,
  RocketLaunchRounded,
} from "@mui/icons-material";

import { tokens } from "../../theme";

export default function EmptyState() {
  return (
    <Box
      sx={{
        borderRadius: "24px",
        minHeight: 420,

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        textAlign: "center",

        p: 5,

        background: "rgba(255,255,255,.04)",

        backdropFilter: "blur(20px)",

        border: "1px solid rgba(255,255,255,.08)",

        position: "relative",

        overflow: "hidden",
      }}
    >
      {/* Decorative Glow */}

      <Box
        sx={{
          position: "absolute",

          width: 250,

          height: 250,

          borderRadius: "50%",

          background:
            "radial-gradient(circle,rgba(59,130,246,.18),transparent 70%)",

          top: -100,

          right: -100,
        }}
      />

      {/* Icon */}

      <Box
        sx={{
          width: 90,

          height: 90,

          borderRadius: "50%",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          background:
            "linear-gradient(135deg,#3b82f6,#2563eb)",

          color: "#fff",

          mb: 3,
        }}
      >
        <RocketLaunchRounded sx={{ fontSize: 42 }} />
      </Box>

      <Typography
        sx={{
          fontSize: 30,

          fontWeight: 800,

          color: tokens.textPrimary,

          mb: 1,
        }}
      >
        No subscriptions yet
      </Typography>

      <Typography
        sx={{
          maxWidth: 450,

          color: tokens.textSecondary,

          lineHeight: 1.8,

          mb: 4,
        }}
      >
        Start tracking your subscriptions and let your AI financial
        advisor monitor renewals, analyze spending, and suggest ways
        to save money every month.
      </Typography>

      <Button
        startIcon={<AddCircleOutlineRounded />}
        variant="contained"
        sx={{
          px: 4,

          py: 1.5,

          borderRadius: "14px",

          textTransform: "none",

          fontWeight: 700,

          fontSize: 15,

          background:
            "linear-gradient(90deg,#3b82f6,#2563eb)",

          "&:hover": {
            background:
              "linear-gradient(90deg,#2563eb,#1d4ed8)",
          },
        }}
      >
        Add Your First Subscription
      </Button>
    </Box>
  );
}