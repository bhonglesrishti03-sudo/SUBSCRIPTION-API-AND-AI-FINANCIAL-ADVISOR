import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  loading = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      BackdropProps={{
        sx: {
          background: "rgba(2,6,23,.82)",
          backdropFilter: "blur(10px)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "24px",
          background: "#111827",
          border: "1px solid rgba(255,255,255,.08)",
          color: "#fff",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: 24,
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent>
        <Typography color="rgba(255,255,255,.7)">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: "#CBD5E1",
          }}
        >
          {cancelText}
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          sx={{
            borderRadius: "12px",
            px: 3,
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}