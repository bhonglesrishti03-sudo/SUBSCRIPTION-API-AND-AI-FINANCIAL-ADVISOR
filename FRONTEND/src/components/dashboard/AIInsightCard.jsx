import {
  Box,
  Typography,
  Button,
  Chip,
} from "@mui/material";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

export default function AIInsightCard() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 250,
        borderRadius: "24px",
        p: 3.5,
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg,#1e293b 0%,#111827 100%)",
        border: "1px solid rgba(255,255,255,.08)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          top: -70,
          right: -70,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(59,130,246,.28),transparent 70%)",
        }}
      />

      <Chip
        icon={<AutoAwesomeRoundedIcon />}
        label="AI Advisor"
        sx={{
          mb: 3,
          bgcolor: "rgba(59,130,246,.15)",
          color: "#60a5fa",
          borderRadius: "10px",
          fontWeight: 700,
        }}
      />

      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: "#fff",
          mb: 1,
        }}
      >
        Ideas for You
      </Typography>

      <Typography
        sx={{
          color: tokens.textSecondary,
          lineHeight: 1.7,
          mb: 3,
        }}
      >
        AI analyzed your subscriptions and found a few opportunities to reduce
        your monthly spending.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TrendingUpRoundedIcon
            sx={{
              color: "#22c55e",
            }}
          />

          <Typography color={tokens.textPrimary}>
            You spent <b>18%</b> less than last month.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <NotificationsActiveRoundedIcon
            sx={{
              color: "#f59e0b",
            }}
          />

          <Typography color={tokens.textPrimary}>
            Netflix renews tomorrow.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <NotificationsActiveRoundedIcon
            sx={{
              color: "#3b82f6",
            }}
          />

          <Typography color={tokens.textPrimary}>
            Spotify renews in 3 days.
          </Typography>
        </Box>
      </Box>

      <Button
        fullWidth
        endIcon={<ArrowForwardRoundedIcon />}
        onClick={() => navigate("/advisor")}
        sx={{
          height: 48,
          borderRadius: "14px",
          textTransform: "none",
          fontWeight: 700,
          background:
            "linear-gradient(90deg,#3b82f6,#2563eb)",
          color: "#fff",

          "&:hover": {
            background:
              "linear-gradient(90deg,#2563eb,#1d4ed8)",
          },
        }}
      >
        Ask AI Advisor
      </Button>
    </Box>
  );
}