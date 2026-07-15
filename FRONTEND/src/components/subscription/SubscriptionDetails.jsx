import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

export default function SubscriptionDetails({
  open,
  onClose,
  subscription,
}) {
  if (!subscription) return null;

  const currencySymbol =
    subscription.currency === "USD"
      ? "$"
      : subscription.currency === "EUR"
      ? "€"
      : "₹";

  const Row = ({ label, value }) => (
    <Box
      display="flex"
      justifyContent="space-between"
      py={1.6}
    >
      <Typography
        sx={{
          color: "#94A3B8",
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          color: "#fff",
          fontWeight: 600,
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      BackdropProps={{
        sx: {
          background: "rgba(2,6,23,.82)",
          backdropFilter: "blur(10px)",
        },
      }}
      PaperProps={{
        sx: {
          background: "#111827",
          borderRadius: "24px",
          color: "#fff",
          border: "1px solid rgba(255,255,255,.08)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: 26,
        }}
      >
        Subscription Details
      </DialogTitle>

      <DialogContent>

        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 700,
            mb: 3,
          }}
        >
          {subscription.name}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Row
          label="Category"
          value={subscription.category}
        />

        <Row
          label="Price"
          value={`${currencySymbol}${subscription.price}`}
        />

        <Row
          label="Frequency"
          value={subscription.frequency}
        />

        <Row
          label="Payment"
          value={subscription.paymentMethod}
        />

        <Row
          label="Currency"
          value={subscription.currency}
        />

        <Row
          label="Start Date"
          value={new Date(
            subscription.startDate
          ).toLocaleDateString()}
        />

        <Row
          label="Renewal"
          value={new Date(
            subscription.renewalDate
          ).toLocaleDateString()}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          py={2}
        >
          <Typography
            sx={{
              color: "#94A3B8",
            }}
          >
            Status
          </Typography>

          <Chip
            label={subscription.status}
            color={
              subscription.status === "active"
                ? "success"
                : "error"
            }
          />
        </Box>

      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}