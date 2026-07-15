import { useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import { glassCard } from "../../theme/glass";
import SubscriptionDetails from "./SubscriptionDetails";
import ConfirmDialog from "../common/ConfirmDialog";

export default function SubscriptionTable({
  subscriptions = [],
  onEdit,
  onDelete
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSubscription, setSelectedSubscription] =
    useState(null);
const [detailsOpen, setDetailsOpen] = useState(false);
  const open = Boolean(anchorEl);
  const [confirmOpen, setConfirmOpen] = useState(false);
const [deleteSubscription, setDeleteSubscription] = useState(null);

  const handleMenuOpen = (event, subscription) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubscription(subscription);
  };

  const handleClose = () => {
  setAnchorEl(null);
};

 const handleEdit = () => {
  if (onEdit && selectedSubscription) {
    onEdit(selectedSubscription);
  }

  handleClose();
};

  const handleDelete = () => {
 setDeleteSubscription(selectedSubscription);
  setConfirmOpen(true);
  handleClose();
};

  const handleView = () => {
  setAnchorEl(null);
  setDetailsOpen(true);
};
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        ...glassCard,
        overflow: "hidden",
      }}
    >
      <Table>
        {/* Header */}

        <TableHead>
          <TableRow
            sx={{
              background:
                "rgba(255,255,255,.04)",
            }}
          >
            {[
              "Subscription",
              "Category",
              "Price",
              "Frequency",
              "Renewal",
              "Status",
              "Actions",
            ].map((item) => (
              <TableCell
                key={item}
                sx={{
                  color:
                    "rgba(255,255,255,.65)",
                  fontWeight: 700,
                  fontSize: 13,
                  borderColor:
                    "rgba(255,255,255,.08)",
                }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Body */}

        <TableBody>
         {subscriptions.length === 0 ? (
    <TableRow>
      <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
        <Typography color="text.secondary">
          No subscriptions match your filters.
        </Typography>
      </TableCell>
    </TableRow>
  ) : (
    subscriptions.map((sub) => (
            <TableRow
              key={sub._id}
              hover
              sx={{
                transition: ".25s",

                "& td": {
                  borderColor:
                    "rgba(255,255,255,.05)",
                  color: "#E2E8F0",
                },

                "&:hover": {
                  background:
                    "rgba(255,255,255,.04)",
                },
              }}
            >
              {/* Name */}

              <TableCell>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,

                      background:
                        "linear-gradient(135deg,#3B82F6,#2563EB)",

                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    {sub.name.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {sub.name}
                    </Typography>

                    <Typography
                      sx={{
                        color:
                          "rgba(255,255,255,.45)",
                        fontSize: 13,
                      }}
                    >
                      {sub.currency}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              {/* Category */}

              <TableCell>
                {sub.category}
              </TableCell>

              {/* Price */}

              <TableCell
                sx={{
                  fontWeight: 700,
                  color: "#60A5FA",
                }}
              >
                {sub.price}
              </TableCell>

              {/* Frequency */}

              <TableCell
                sx={{
                  textTransform:
                    "capitalize",
                }}
              >
                {sub.frequency}
              </TableCell>

              {/* Renewal */}

              <TableCell>
                {new Date(
                  sub.renewalDate
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </TableCell>

              {/* Status */}

              <TableCell>
                <Chip
                  label={sub.status}
                  size="small"
                  sx={{
                    fontWeight: 700,

                    background:
                      sub.status === "active"
                        ? "rgba(34,197,94,.15)"
                        : sub.status ===
                          "expired"
                        ? "rgba(239,68,68,.15)"
                        : "rgba(245,158,11,.15)",

                    color:
                      sub.status === "active"
                        ? "#22C55E"
                        : sub.status ===
                          "expired"
                        ? "#EF4444"
                        : "#F59E0B",
                  }}
                />
              </TableCell>

              {/* Actions */}

              <TableCell>
                <IconButton
                  onClick={(e) =>
                    handleMenuOpen(e, sub)
                  }
                  sx={{
                    color:
                      "rgba(255,255,255,.6)",

                    "&:hover": {
                      background:
                        "rgba(255,255,255,.08)",

                      color: "#fff",
                    },
                  }}
                >
                  <MoreVertRoundedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
  )}
      
        </TableBody>
      </Table>

      {/* Menu */}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            background:
              "rgba(17,25,40,.95)",

            backdropFilter:
              "blur(20px)",

            borderRadius: "18px",

            border:
              "1px solid rgba(255,255,255,.08)",

            color: "#fff",

            minWidth: 190,
          },
        }}
      >
        <MenuItem onClick={handleView}>
          <VisibilityRoundedIcon
            fontSize="small"
            sx={{
              mr: 1.5,
            }}
          />
          View Details
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <EditRoundedIcon
            fontSize="small"
            sx={{
              mr: 1.5,
            }}
          />
          Edit
        </MenuItem>

        <MenuItem
          onClick={handleDelete}
          sx={{
            color: "#F87171",
          }}
        >
          <DeleteRoundedIcon
            fontSize="small"
            sx={{
              mr: 1.5,
            }}
          />
          Delete
        </MenuItem>
      </Menu>
      <SubscriptionDetails
  open={detailsOpen}
  onClose={() => setDetailsOpen(false)}
  subscription={selectedSubscription}
/>
<ConfirmDialog
  open={confirmOpen}
  title="Delete Subscription?"
  message={`Are you sure you want to delete "${deleteSubscription?.name}"? This action cannot be undone.`}
  confirmText="Delete"
  onClose={() => {
    setConfirmOpen(false);
    setDeleteSubscription(null);
  }}
  onConfirm={() => {
    onDelete(deleteSubscription._id);
    setConfirmOpen(false);
    setDeleteSubscription(null);
  }}
/>
    </TableContainer>
  );
}