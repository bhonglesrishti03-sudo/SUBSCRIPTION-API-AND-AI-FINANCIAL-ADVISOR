import {
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";

import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

export default function AIInsightCard({ dashboard }) {
  const navigate = useNavigate();

  const activeSubscriptions =
    dashboard?.stats?.activeSubscriptions ?? 0;

  const monthlySpending =
    Number(dashboard?.stats?.monthlySpending ?? 0);

  const upcomingRenewals =
    dashboard?.stats?.upcomingRenewals ?? 0;

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

      {/* Header */}
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
        Get personalized insights based on your actual
        subscription spending and upcoming renewals.
      </Typography>

      {/* Dynamic Insights */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
        }}
      >
        {/* Active subscriptions */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
          }}
        >
          <TrendingUpRoundedIcon
            sx={{
              color: "#22c55e",
              mt: 0.2,
            }}
          />

          <Typography
            sx={{
              color: tokens.textPrimary,
              lineHeight: 1.5,
            }}
          >
            You currently have{" "}
            <b>{activeSubscriptions}</b>{" "}
            active subscriptions.
          </Typography>
        </Box>

        {/* Monthly spending */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
          }}
        >
          <PaymentsRoundedIcon
            sx={{
              color: "#f59e0b",
              mt: 0.2,
            }}
          />

          <Typography
            sx={{
              color: tokens.textPrimary,
              lineHeight: 1.5,
            }}
          >
            Your monthly subscription spending is{" "}
            <b>₹{monthlySpending.toFixed(0)}</b>.
          </Typography>
        </Box>

        {/* Upcoming renewals */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
          }}
        >
          <NotificationsActiveRoundedIcon
            sx={{
              color: "#3b82f6",
              mt: 0.2,
            }}
          />

          <Typography
            sx={{
              color: tokens.textPrimary,
              lineHeight: 1.5,
            }}
          >
            You have{" "}
            <b>{upcomingRenewals}</b>{" "}
            upcoming renewals.
          </Typography>
        </Box>
      </Box>

      {/* AI Advisor Button */}
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