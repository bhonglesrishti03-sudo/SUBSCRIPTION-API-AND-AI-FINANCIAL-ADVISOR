import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { glassCard } from "../../theme/glass";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "16px",
        background: "rgba(17,25,40,.75)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,.12)",
      }}
    >
      <Typography
        sx={{
          color: "#94A3B8",
          fontSize: 12,
        }}
      >
        Spending
      </Typography>

      <Typography
        sx={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        ₹{payload[0].value}
      </Typography>
    </Box>
  );
}

export default function SpendingChart({ dashboard }) {
  const data = dashboard?.monthlyTrend || [];

  return (
    <Box
      sx={{
        ...glassCard,
        p: 4,
        height: "100%",
      }}
    >
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            Spending Overview
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,.55)",
              mt: .5,
            }}
          >
            Last 6 Months
          </Typography>
        </Box>

        <Typography
          sx={{
            color: "#60A5FA",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          ₹{dashboard?.stats?.monthlySpending || 0}
        </Typography>
      </Box>

      {data.length === 0 ? (
        <Box
          sx={{
            height: 320,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "rgba(255,255,255,.5)",
          }}
        >
          No spending data available
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#60A5FA" />

                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,.05)"
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "rgba(255,255,255,.55)",
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{
                fill: "rgba(255,255,255,.55)",
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                stroke: "#3B82F6",
                strokeDasharray: "3 3",
              }}
              content={<CustomTooltip />}
            />

            <Line
              dataKey="amount"
              type="monotone"
              stroke="url(#lineGradient)"
              strokeWidth={4}
              dot={{
                fill: "#60A5FA",
                r: 5,
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 8,
                fill: "#3B82F6",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}