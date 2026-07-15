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
} from "@mui/material";

import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import ReactMarkdown from "react-markdown";

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

    await navigator.clipboard.writeText(advice);
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

        {/* Advice */}

        {!loading && !error && (
          <>
            <Box
              sx={{
                lineHeight: 1.9,

                "& h1": {
                  mt: 3,
                  mb: 2,
                  fontSize: 30,
                  fontWeight: 800,
                },

                "& h2": {
                  mt: 3,
                  mb: 2,
                  fontSize: 24,
                  fontWeight: 700,
                },

                "& h3": {
                  mt: 2,
                  mb: 1,
                  fontSize: 20,
                  fontWeight: 700,
                },

                "& p": {
                  color: "#d1d5db",
                  mb: 2,
                },

                "& ul": {
                  paddingLeft: "22px",
                },

                "& li": {
                  marginBottom: "10px",
                },

                "& strong": {
                  color: "#fff",
                },
              }}
            >
              <ReactMarkdown>
                {advice}
              </ReactMarkdown>
            </Box>

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
          </>
        )}

        {/* Button */}

        {!loading && (
          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
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