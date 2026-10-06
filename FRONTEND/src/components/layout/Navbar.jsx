import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useThemeMode } from "../../context/ThemeContext";
import { tokens } from "../../theme";

export default function Navbar({
  title = "Dashboard",
  eyebrow = "Overview",
}) {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const initial =
    user?.name?.charAt(0)?.toUpperCase() || "?";

  const isDark = mode === "dark";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: isDark
          ? "rgba(17,24,39,.65)"
          : "rgba(255,255,255,.75)",

        backdropFilter: "blur(18px)",

        borderBottom: `1px solid ${
          isDark ? tokens.glassBorder : "#E2E8F0"
        }`,

        boxShadow: "none",

        color: isDark ? "#fff" : "#111827",

        transition:
          "background .3s ease, border-color .3s ease, color .3s ease",
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

              color: isDark
                ? tokens.textTertiary
                : tokens.textTertiaryLight,

              fontWeight: 600,
            }}
          >
            {eyebrow}
          </Typography>

          <Typography
            sx={{
              mt: 0.3,
              fontFamily: tokens.fontDisplay,
              fontWeight: 700,
              fontSize: 28,

              color: isDark
                ? tokens.textPrimary
                : tokens.textPrimaryLight,

              transition: "color .3s ease",
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

              background: isDark
                ? "rgba(255,255,255,.04)"
                : "rgba(15,23,42,.04)",

              border: `1px solid ${
                isDark ? tokens.glassBorder : "#E2E8F0"
              }`,

              transition:
                "background .3s ease, border-color .3s ease",
            }}
          >
            <SearchIcon
              sx={{
                color: isDark
                  ? tokens.textSecondary
                  : tokens.textSecondaryLight,

                mr: 1,
                fontSize: 20,
              }}
            />

            <InputBase
              placeholder="Search..."
              sx={{
                color: isDark
                  ? tokens.textPrimary
                  : tokens.textPrimaryLight,

                flex: 1,
                fontSize: 14,

                "& input::placeholder": {
                  color: isDark
                    ? tokens.textTertiary
                    : tokens.textTertiaryLight,

                  opacity: 1,
                },
              }}
            />

            <Typography
              sx={{
                fontSize: 12,

                color: isDark
                  ? tokens.textTertiary
                  : tokens.textTertiaryLight,

                border: `1px solid ${
                  isDark ? tokens.glassBorder : "#E2E8F0"
                }`,

                px: 0.8,
                py: 0.2,
                borderRadius: 1,
              }}
            >
              ⌘K
            </Typography>
          </Box>

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            aria-label="Toggle theme"
            sx={{
              width: 44,
              height: 44,

              background: isDark
                ? "rgba(255,255,255,.04)"
                : "rgba(15,23,42,.05)",

              border: `1px solid ${
                isDark ? tokens.glassBorder : "#E2E8F0"
              }`,

              color: isDark
                ? "#fff"
                : "#111827",

              transition:
                "background .3s ease, color .3s ease, border-color .3s ease",

              "&:hover": {
                background: isDark
                  ? "rgba(255,255,255,.08)"
                  : "rgba(15,23,42,.08)",
              },
            }}
          >
            {isDark ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>

          {/* Notifications */}
          <IconButton
            sx={{
              width: 44,
              height: 44,

              background: isDark
                ? "rgba(255,255,255,.04)"
                : "rgba(15,23,42,.05)",

              border: `1px solid ${
                isDark ? tokens.glassBorder : "#E2E8F0"
              }`,

              color: isDark
                ? "#fff"
                : "#111827",

              transition:
                "background .3s ease, color .3s ease, border-color .3s ease",

              "&:hover": {
                background: isDark
                  ? "rgba(255,255,255,.08)"
                  : "rgba(15,23,42,.08)",
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
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{
              width: 46,
              height: 46,

              bgcolor: tokens.emerald,

              fontWeight: 700,
              fontSize: 18,

              border: isDark
                ? "2px solid rgba(255,255,255,.12)"
                : "2px solid rgba(15,23,42,.10)",

              cursor: "pointer",

              transition: ".25s",

              "&:hover": {
                transform: "scale(1.08)",
              },
            }}
          >
            {!user?.avatar && initial}
          </Avatar>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                mt: 1,

                background: isDark
                  ? "rgba(17,25,40,.95)"
                  : "rgba(255,255,255,.97)",

                backdropFilter: "blur(20px)",

                borderRadius: "16px",

                border: `1px solid ${
                  isDark ? tokens.glassBorder : "#E2E8F0"
                }`,

                color: isDark
                  ? "#fff"
                  : "#111827",

                minWidth: 200,

                boxShadow: isDark
                  ? "0 20px 45px rgba(0,0,0,.35)"
                  : "0 20px 45px rgba(15,23,42,.12)",
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
              sx={{
                color: tokens.coral,
              }}
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