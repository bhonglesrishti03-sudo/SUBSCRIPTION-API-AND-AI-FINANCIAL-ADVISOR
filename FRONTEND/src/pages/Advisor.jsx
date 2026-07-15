import { Box, Typography } from "@mui/material";

import DashboardLayout from "../components/layout/DashboardLayout";
import AIAdviceCard from "../components/advisor/AIAdviceCard";

import useAdvisor from "../hooks/useAdvisor";

export default function Advisor() {
  const {
    advice,
    loading,
    error,
    refresh,
  } = useAdvisor();

  return (
    <DashboardLayout
      title="AI Financial Advisor"
      eyebrow="Artificial Intelligence"
    >
      {/* Hero */}
      <Box
        sx={{
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: 36,
            fontWeight: 800,
            mb: 1,
          }}
        >
          🤖 AI Financial Advisor
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            maxWidth: 720,
            fontSize: 16,
            lineHeight: 1.8,
          }}
        >
          Receive personalized financial insights based on your subscriptions,
          monthly spending, renewal schedule, and categories. Our AI analyzes
          your subscription habits and helps you reduce unnecessary expenses.
        </Typography>
      </Box>

      {/* AI Advice */}
      <AIAdviceCard
        advice={advice}
        loading={loading}
        error={error}
        onRefresh={refresh}
      />
    </DashboardLayout>
  );
}