import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { glassCard } from "../../theme/glass";

const COLORS = [
  "#3B82F6",
  "#60A5FA",
  "#38BDF8",
  "#2563EB",
  "#14B8A6",
  "#22C55E",
  "#F59E0B",
  "#EC4899",
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "16px",
        background: "rgba(17,25,40,.78)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,.1)",
      }}
    >
      <Typography
        sx={{
          color: "#94A3B8",
          fontSize: 12,
        }}
      >
        {payload[0].name}
      </Typography>

      <Typography
        sx={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        ₹{payload[0].value}
      </Typography>
    </Box>
  );
}

export default function CategoryChart({ data = [] }) {
  const chartData = data;
console.log("Category Data:", data);
  return (
    <Box
      sx={{
        ...glassCard,
        p: 4,
        minHeight: 430,
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 22,
          mb: 0.5,
        }}
      >
        Spending by Category
      </Typography>

      <Typography
        sx={{
          color: "rgba(255,255,255,.55)",
          mb: 4,
        }}
      >
        Distribution of your subscriptions
      </Typography>

      {chartData.length === 0 ? (
        <Box
          sx={{
            height: 310,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,.55)",
              lineHeight: 1.8,
            }}
          >
            No category data available.
            <br />
            Add subscriptions to view your spending.
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              stroke="rgba(255,255,255,.08)"
              strokeWidth={2}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                color: "#E2E8F0",
                fontSize: "13px",
                paddingTop: "20px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}