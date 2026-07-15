import { Box, CircularProgress } from "@mui/material";

import DashboardLayout from "../components/layout/DashboardLayout";

import WelcomeHero from "../components/dashboard/WelcomeHero";
import AIInsightCard from "../components/dashboard/AIInsightCard";
import StatCard from "../components/dashboard/StatCard";
import SpendingChart from "../components/dashboard/SpendingChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import RecentSubscriptions from "../components/dashboard/RecentSubscriptions";
import EmptyState from "../components/dashboard/EmptyState";

import {
  Payments,
  CreditCard,
  CalendarMonth,
  Savings,
} from "@mui/icons-material";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

import useDashboard from "../hooks/useDashboard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { dashboard, loading, error } = useDashboard();
const navigate = useNavigate();
  if (loading) {
    return (
      <DashboardLayout title="Dashboard" eyebrow="Overview">
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Dashboard" eyebrow="Overview">
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "red",
            fontSize: 18,
          }}
        >
          {error}
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard" eyebrow="Overview">

      {/* Hero + AI */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "2fr 1fr",
          },
          gap: 3,
          mb: 3,
        }}
      >
        <WelcomeHero />
        <AIInsightCard dashboard={dashboard} />
      </Box>

      {/* Stat Cards */}

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
  value={dashboard.stats.monthlySpending}
  prefix="₹"
  icon={<PaidRoundedIcon />}
/>

        <StatCard
          title="Active Plans"
          value={dashboard.stats?.activeSubscriptions ?? 0}
          icon={<CreditCard />}
        />

        <StatCard
          title="Upcoming Renewals"
          value={dashboard.stats?.upcomingRenewals ?? 0}
          icon={<CalendarMonth />}
        />

        <StatCard
          title="Categories"
          value={dashboard.stats?.categories ?? 0}
          icon={<Savings />}
        />
      </Box>

      {/* Charts */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "2fr 1fr",
          },
          gap: 3,
          mb: 3,
        }}
      >
        <SpendingChart dashboard={dashboard} />

        <CategoryChart
  data={dashboard.categoryDistribution}
/>
      </Box>

      {/* Recent Subscriptions */}
      <Box>
        {dashboard.recentSubscriptions?.length > 0 ? (
          <RecentSubscriptions
            subscriptions={dashboard.recentSubscriptions}
          />
        ) : (
          <EmptyState />
        )}
      </Box>

    </DashboardLayout>
  );
}