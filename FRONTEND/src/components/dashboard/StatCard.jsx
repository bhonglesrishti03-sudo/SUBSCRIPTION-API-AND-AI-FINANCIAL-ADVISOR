import { Box, Typography, Chip } from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { tokens } from "../../theme";

export default function StatCard({
  title,
  value,
  icon,
  trend,
  prefix = ""
}) {
  return (
    <Box
      sx={{
        height: 185,
        width: "100%",
        p: 3,

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        borderRadius: "24px",

        background: "rgba(255,255,255,0.08)",

        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",

        border: "1px solid rgba(255,255,255,0.12)",

        boxShadow:
          "0 15px 45px rgba(0,0,0,.25), inset 0 1px 1px rgba(255,255,255,.06)",

        transition: "all .35s ease",

        overflow: "hidden",

        position: "relative",

        "&:hover": {
          transform: "translateY(-8px)",
          border: "1px solid rgba(59,130,246,.45)",
          boxShadow:
            "0 20px 60px rgba(37,99,235,.30), inset 0 1px 1px rgba(255,255,255,.08)",
        },

        "&::before": {
          content: '""',
          position: "absolute",
          top: -80,
          right: -80,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(59,130,246,.10)",
          filter: "blur(70px)",
        },
      }}
    >
      {/* Header */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ position: "relative", zIndex: 2 }}
      >
        <Typography
          sx={{
            color: "#94A3B8",
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: ".08em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            width: 56,
            height: 56,

            borderRadius: "18px",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            background:
              "linear-gradient(135deg,#2563EB,#3B82F6)",

            color: "#fff",

            boxShadow:
              "0 12px 30px rgba(37,99,235,.45)",

            "& svg": {
              fontSize: 28,
            },
          }}
        >
          {icon}
        </Box>
      </Box>

      {/* Value */}

      <Typography
  sx={{
    fontSize: 46,
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1,
    position: "relative",
    zIndex: 2,
  }}
>
  {prefix}
  {Number(value).toLocaleString("en-IN")}
</Typography>

      {/* Footer */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ position: "relative", zIndex: 2 }}
      >
        {trend ? (
          <Chip
            icon={<TrendingUpRoundedIcon />}
            label={trend}
            size="small"
            sx={{
              bgcolor: "rgba(34,197,94,.18)",

              color: "#22C55E",

              fontWeight: 700,

              borderRadius: "12px",

              "& .MuiChip-icon": {
                color: "#22C55E",
              },
            }}
          />
        ) : (
          <Typography
            sx={{
              fontSize: 12,
              color: "#94A3B8",
            }}
          >
            Live
          </Typography>
        )}

        <Typography
          sx={{
            fontSize: 12,
            color: "#94A3B8",
          }}
        >
          Updated now
        </Typography>
      </Box>
    </Box>
  );
}