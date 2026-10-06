import { useState } from "react";

import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Stack,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Chip,
  Divider,
} from "@mui/material";

import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { glassCard } from "../../theme/glass";

export default function AIAdviceCard({
  advice,
  loading,
  error,
  onRefresh,
}) {
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    if (!advice) return;

    const textToCopy = [
      advice.summary || "",

      ...(advice.insights || []).map(
        (item) =>
          `${item.title}: ${item.description}`
      ),

      ...(advice.recommendations || []).map(
        (item) =>
          `${item.subscription} - ${item.action}: ${item.reason} (Estimated monthly saving: ₹${item.estimatedMonthlySaving || 0})`
      ),

      ...(advice.limitations || []).map(
        (item) => `Limitation: ${item}`
      ),
    ].join("\n\n");

    await navigator.clipboard.writeText(textToCopy);
    setOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          ...glassCard,
          p: 4,
          borderRadius: "24px",
        }}
      >
        {/* Header */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          flexWrap="wrap"
          gap={2}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: "18px",
                background:
                  "linear-gradient(135deg,#2563eb,#06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SmartToyRoundedIcon
                sx={{
                  color: "#fff",
                  fontSize: 32,
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
              >
                AI Financial Advisor
              </Typography>

              <Typography
                color="text.secondary"
                fontSize={14}
              >
                Personalized insights based on your
                subscriptions and spending habits.
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Tooltip title="Copy Advice">
              <span>
                <IconButton
                  disabled={!advice || loading}
                  onClick={handleCopy}
                >
                  <ContentCopyRoundedIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Generate Again">
              <span>
                <IconButton
                  disabled={loading}
                  onClick={onRefresh}
                >
                  <RefreshRoundedIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Loading */}

        {loading && (
          <Box
            sx={{
              py: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <CircularProgress size={55} />

            <Typography
              variant="h6"
              fontWeight={600}
            >
              AI is analyzing your subscriptions...
            </Typography>

            <Stack spacing={1}>
              <Chip
                label="Calculating monthly spending..."
                color="primary"
              />

              <Chip
                label="Reviewing renewal dates..."
                color="primary"
              />

              <Chip
                label="Finding savings opportunities..."
                color="primary"
              />

              <Chip
                label="Generating personalized advice..."
                color="primary"
              />
            </Stack>
          </Box>
        )}

        {/* Error */}

        {!loading && error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {/* AI Advice */}

        {!loading && !error && advice && (
          <Box>
            {/* Summary */}

            <Box
              sx={{
                p: 3,
                borderRadius: "18px",
                background:
                  "rgba(59,130,246,.08)",
                border:
                  "1px solid rgba(59,130,246,.15)",
                mb: 4,
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                mb={1.5}
              >
                <SmartToyRoundedIcon
                  sx={{
                    color: "#60a5fa",
                  }}
                />

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  Spending Summary
                </Typography>
              </Stack>

              <Typography
                color="text.secondary"
                lineHeight={1.8}
              >
                {advice.summary ||
                  "No summary was generated."}
              </Typography>
            </Box>

            {/* Insights */}

            {advice.insights?.length > 0 && (
              <Box mb={4}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={2}
                >
                  Key Insights
                </Typography>

                <Stack spacing={2}>
                  {advice.insights.map(
                    (insight, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 2.5,
                          borderRadius: "16px",
                          background:
                            "rgba(255,255,255,.04)",
                          border:
                            "1px solid rgba(255,255,255,.07)",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="flex-start"
                        >
                          <TrendingUpRoundedIcon
                            sx={{
                              color: "#22c55e",
                              mt: 0.3,
                            }}
                          />

                          <Box>
                            <Typography
                              fontWeight={700}
                              mb={0.5}
                            >
                              {insight.title}
                            </Typography>

                            <Typography
                              color="text.secondary"
                              lineHeight={1.7}
                            >
                              {insight.description}
                            </Typography>

                            {insight.type && (
                              <Chip
                                label={insight.type}
                                size="small"
                                sx={{
                                  mt: 1.5,
                                  textTransform:
                                    "capitalize",
                                }}
                              />
                            )}
                          </Box>
                        </Stack>
                      </Box>
                    )
                  )}
                </Stack>
              </Box>
            )}

            {/* Recommendations */}

            {advice.recommendations?.length > 0 && (
              <Box mb={4}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={2}
                >
                  Recommendations
                </Typography>

                <Stack spacing={2}>
                  {advice.recommendations.map(
                    (recommendation, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 2.5,
                          borderRadius: "16px",
                          background:
                            "rgba(34,197,94,.06)",
                          border:
                            "1px solid rgba(34,197,94,.12)",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="flex-start"
                        >
                          <SavingsRoundedIcon
                            sx={{
                              color: "#22c55e",
                              mt: 0.3,
                            }}
                          />

                          <Box sx={{ flex: 1 }}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              gap={2}
                              flexWrap="wrap"
                            >
                              <Typography
                                fontWeight={700}
                              >
                                {recommendation.subscription}
                              </Typography>

                              <Chip
                                label={
                                  recommendation.action
                                }
                                size="small"
                                color={
                                  recommendation.action ===
                                  "cancel"
                                    ? "error"
                                    : recommendation.action ===
                                      "downgrade"
                                    ? "warning"
                                    : "primary"
                                }
                                sx={{
                                  textTransform:
                                    "capitalize",
                                }}
                              />
                            </Stack>

                            <Typography
                              color="text.secondary"
                              lineHeight={1.7}
                              mt={1}
                            >
                              {recommendation.reason}
                            </Typography>

                            <Typography
                              sx={{
                                mt: 1.5,
                                color: "#22c55e",
                                fontWeight: 700,
                              }}
                            >
                              Estimated monthly saving: ₹
                              {Number(
                                recommendation.estimatedMonthlySaving ||
                                  0
                              ).toFixed(0)}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    )
                  )}
                </Stack>
              </Box>
            )}

            {/* Limitations */}

            {advice.limitations?.length > 0 && (
              <Box mb={3}>
                <Divider sx={{ mb: 3 }} />

                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="flex-start"
                >
                  <WarningAmberRoundedIcon
                    sx={{
                      color: "#f59e0b",
                      mt: 0.2,
                    }}
                  />

                  <Box>
                    <Typography
                      fontWeight={700}
                      mb={1}
                    >
                      Analysis Limitations
                    </Typography>

                    {advice.limitations.map(
                      (limitation, index) => (
                        <Typography
                          key={index}
                          color="text.secondary"
                          fontSize={14}
                          lineHeight={1.7}
                        >
                          • {limitation}
                        </Typography>
                      )
                    )}
                  </Box>
                </Stack>
              </Box>
            )}

            {/* Generated Time */}

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mt={4}
            >
              <AccessTimeRoundedIcon
                sx={{
                  fontSize: 18,
                  color: "text.secondary",
                }}
              />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Last generated:{" "}
                {new Date().toLocaleString()}
              </Typography>
            </Stack>
          </Box>
        )}

        {/* Generate Button */}

        {!loading && (
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<RefreshRoundedIcon />}
            onClick={onRefresh}
            sx={{
              mt: 4,
              borderRadius: "14px",
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            Generate New Advice
          </Button>
        )}
      </Box>

      {/* Snackbar */}

      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setOpen(false)}
        >
          Advice copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}