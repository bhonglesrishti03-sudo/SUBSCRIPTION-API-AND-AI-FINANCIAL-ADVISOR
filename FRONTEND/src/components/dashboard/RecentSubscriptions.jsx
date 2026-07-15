import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { glassCard } from "../../theme/glass";

export default function RecentSubscriptions({
  subscriptions = [],
}) {
  const currencySymbols = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
};
  return (
    <Box
      sx={{
        ...glassCard,
        p: 4,
      }}
    >
      {/* Header */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            Recent Subscriptions
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,.6)",
              mt: 0.5,
            }}
          >
            Latest subscriptions you've added
          </Typography>
        </Box>

        
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,.08)",
          mb: 3,
        }}
      />

      <Stack spacing={2}>
        {subscriptions.map((sub) => (
          <Box
            key={sub._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              px: 3,
              py: 2.2,

              borderRadius: "18px",

              background:
                "rgba(255,255,255,.05)",

              border:
                "1px solid rgba(255,255,255,.06)",

              transition: ".25s",

              "&:hover": {
                transform: "translateY(-2px)",

                background:
                  "rgba(255,255,255,.08)",

                border:
                  "1px solid rgba(59,130,246,.3)",
              },
            }}
          >
            {/* Left */}

            <Box
              display="flex"
              alignItems="center"
              gap={2}
              width="35%"
            >
              <Avatar
                sx={{
                  width: 52,
                  height: 52,

                  background:
                    "linear-gradient(135deg,#2563EB,#60A5FA)",

                  fontWeight: 700,

                  fontSize: 18,
                }}
              >
                {sub.name.charAt(0).toUpperCase()}
              </Avatar>

              <Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {sub.name}
                </Typography>

                <Typography
                  sx={{
                    color:
                      "rgba(255,255,255,.55)",

                    fontSize: 13,
                  }}
                >
                  {sub.category}
                </Typography>
              </Box>
            </Box>

            {/* Price */}
           

           <Typography
  sx={{
    width: "15%",
    color: "#60A5FA",
    fontWeight: 700,
    textAlign: "center",
  }}
>
  {currencySymbols[sub.currency] || sub.currency} {sub.price}
</Typography>

            {/* Renewal */}

            <Typography
              sx={{
                width: "20%",
                color: "rgba(255,255,255,.65)",
                textAlign: "center",
              }}
            >
              {new Date(
                sub.renewalDate
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Typography>

            {/* Frequency */}

            <Typography
              sx={{
                width: "15%",
                color: "#94A3B8",
                textTransform: "capitalize",
                textAlign: "center",
              }}
            >
              {sub.frequency}
            </Typography>

            {/* Status */}

            <Box width="15%" textAlign="right">
              <Chip
                label={sub.status}

                size="small"

                sx={{
                  textTransform: "capitalize",

                  fontWeight: 700,

                  bgcolor:
                    sub.status === "active"
                      ? "rgba(34,197,94,.18)"
                      : sub.status === "expired"
                      ? "rgba(239,68,68,.18)"
                      : "rgba(245,158,11,.18)",

                  color:
                    sub.status === "active"
                      ? "#22C55E"
                      : sub.status === "expired"
                      ? "#EF4444"
                      : "#F59E0B",

                  border:
                    "1px solid rgba(255,255,255,.08)",
                }}
              />
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}