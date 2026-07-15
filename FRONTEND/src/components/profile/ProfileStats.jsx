import { Box } from "@mui/material";

import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

import StatCard from "../dashboard/StatCard";
import useDashboard from "../../hooks/useDashboard";

export default function ProfileStats() {
  const { dashboard, loading } = useDashboard();

  if (loading) return null;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2,1fr)",
          lg: "repeat(4,1fr)",
        },
        gap: 3,
        mb: 3,
      }}
    >
      <StatCard
        title="Monthly Spending"
        value={dashboard?.stats?.monthlySpending ?? 0}
        prefix="₹"
        icon={<PaidRoundedIcon />}
      />

      <StatCard
        title="Active Plans"
        value={dashboard?.stats?.activeSubscriptions ?? 0}
        icon={<CreditCardRoundedIcon />}
      />

      <StatCard
        title="Upcoming Renewals"
        value={dashboard?.stats?.upcomingRenewals ?? 0}
        icon={<CalendarMonthRoundedIcon />}
      />

      <StatCard
        title="Categories"
        value={dashboard?.stats?.categories ?? 0}
        icon={<CategoryRoundedIcon />}
      />
    </Box>
  );
}