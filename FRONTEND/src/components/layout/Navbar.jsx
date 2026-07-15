import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  IconButton,
  InputBase,
  Badge,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { useAuth } from "../../context/AuthContext";
import { tokens } from "../../theme";

import { Menu, MenuItem, Divider } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
export default function Navbar({
  title = "Dashboard",
  eyebrow = "Overview",
}) {
  const { user,logout } = useAuth();

  const initial = user?.name?.charAt(0)?.toUpperCase() || "?";

  const navigate = useNavigate();

const [anchorEl, setAnchorEl] = useState(null);

const open = Boolean(anchorEl);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(17,24,39,.65)",
        backdropFilter: "blur(18px)",
        borderBottom: `1px solid ${tokens.border}`,
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "78px",
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Left */}
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: ".18em",
              color: tokens.textTertiary,
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </Typography>

          <Typography
            sx={{
              mt: .3,
              fontFamily: tokens.fontDisplay,
              fontWeight: 700,
              fontSize: 28,
              color: tokens.textPrimary,
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Search */}
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              px: 2,
              width: 250,
              height: 46,
              borderRadius: "14px",
              background: "rgba(255,255,255,.04)",
              border: `1px solid ${tokens.border}`,
            }}
          >
            <SearchIcon
              sx={{
                color: tokens.textSecondary,
                mr: 1,
                fontSize: 20,
              }}
            />

            <InputBase
              placeholder="Search..."
              sx={{
                color: tokens.textPrimary,
                flex: 1,
                fontSize: 14,
              }}
            />

            <Typography
              sx={{
                fontSize: 12,
                color: tokens.textTertiary,
                border: `1px solid ${tokens.border}`,
                px: .8,
                py: .2,
                borderRadius: 1,
              }}
            >
              ⌘K
            </Typography>
          </Box>

          {/* Theme */}
          <IconButton
            sx={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,.04)",
              border: `1px solid ${tokens.border}`,
              "&:hover": {
                background: "rgba(255,255,255,.08)",
              },
            }}
          >
            <DarkModeOutlinedIcon />
          </IconButton>

          {/* Notification */}
          <IconButton
            sx={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,.04)",
              border: `1px solid ${tokens.border}`,
              "&:hover": {
                background: "rgba(255,255,255,.08)",
              },
            }}
          >
            <Badge
              badgeContent={2}
              color="error"
            >
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </IconButton>

          {/* Avatar */}
        <Avatar
  src={user?.avatar}
  onClick={() => navigate("/profile")}
  sx={{
    width: 46,
    height: 46,
    bgcolor: tokens.emerald,
    fontWeight: 700,
    fontSize: 18,
    border: "2px solid rgba(255,255,255,.12)",
    cursor: "pointer",

    transition: ".25s",

    "&:hover": {
      transform: "scale(1.08)",
    },
  }}
></Avatar>

<Menu
  anchorEl={anchorEl}
  open={open}
  onClose={() => setAnchorEl(null)}
  PaperProps={{
    sx: {
      mt: 1,
      background: "rgba(17,25,40,.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "16px",
      border: "1px solid rgba(255,255,255,.08)",
      color: "#fff",
      minWidth: 200,
    },
  }}
>
  <MenuItem
    onClick={() => {
      navigate("/profile");
      setAnchorEl(null);
    }}
  >
    <PersonRoundedIcon sx={{ mr: 1.5 }} />
    Profile
  </MenuItem>

  <Divider />

  <MenuItem
    sx={{ color: "#EF4444" }}
    onClick={() => {
  logout();
  navigate("/login");
  setAnchorEl(null);
}}
  >
    <LogoutRoundedIcon sx={{ mr: 1.5 }} />
    Logout
  </MenuItem>
</Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}