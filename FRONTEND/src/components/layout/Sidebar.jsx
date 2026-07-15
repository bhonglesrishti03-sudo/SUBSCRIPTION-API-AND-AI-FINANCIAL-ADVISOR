import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import {
  Dashboard,
  CreditCard,
  Psychology,
  Person,
  Logout,
} from "@mui/icons-material";

import { Link, useLocation, useNavigate } from "react-router-dom";

import OrbitMark from "../dashboard/OrbitMark";
import { tokens } from "../../theme";
import { useAuth } from "../../context/AuthContext";

const menu = [
  {
    name: "Dashboard",
    icon: <Dashboard fontSize="small" />,
    path: "/dashboard",
  },
  {
    name: "Subscriptions",
    icon: <CreditCard fontSize="small" />,
    path: "/subscriptions",
  },
  {
    name: "AI Advisor",
    icon: <Psychology fontSize="small" />,
    path: "/advisor",
  },
  {
    name: "Profile",
    icon: <Person fontSize="small" />,
    path: "/profile",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box
      component="nav"
      sx={{
        width: 275,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(165deg, ${tokens.ink}, ${tokens.inkSoft})`,
        color: "#fff",
        borderRight: "1px solid rgba(255,255,255,.05)",
        boxShadow: "0 25px 60px rgba(0,0,0,.35)",
        position: "sticky",
        top: 0,
      }}
    >
      {/* ================= Logo ================= */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 3,
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#2563EB,#60A5FA)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow:
              "0 10px 25px rgba(146, 160, 191, 0.35)",
          }}
        >
          <OrbitMark size={26} />
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              color: "#fff",
            }}
          >
            SubPilot
          </Typography>

          <Typography
            sx={{
              fontFamily: tokens.fontMono,
              fontSize: 11,
              color: "rgba(255,255,255,.5)",
              letterSpacing: ".18em",
            }}
          >
            AI ADVISOR
          </Typography>
        </Box>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,.08)",
          mx: 3,
        }}
      />

      {/* ================= Navigation ================= */}

      <List
        sx={{
          mt: 3,
          px: 2,
          flex: 1,
        }}
      >
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.name}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: "16px",
                py: 1.5,
                px: 2,
                mb: 1,

                position: "relative",

                color: active
                  ? "#fff"
                  : "rgba(255,255,255,.65)",

                background: active
                  ? "rgba(255,255,255,.08)"
                  : "transparent",

                transition: ".25s",

                "&:hover": {
                  background: "rgba(255,255,255,.06)",
                  color: "#fff",
                  transform: "translateX(4px)",
                },

                "&::before": active
                  ? {
                      content: '""',
                      position: "absolute",
                      left: -4,
                      width: 4,
                      height: "60%",
                      borderRadius: 5,
                      background:
                        "linear-gradient(#3B82F6,#60A5FA)",
                    }
                  : {},
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: active
                    ? "#60A5FA"
                    : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: active ? 700 : 500,
                  fontSize: 15,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* ================= Bottom ================= */}

      <Box
        sx={{
          p: 2,
        }}
      >
        <Divider
          sx={{
            borderColor: "rgba(255,255,255,.08)",
            mb: 2,
          }}
        />

        {/* User */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,

            p: 2,

            borderRadius: "18px",

            background: "rgba(255,255,255,.04)",

            border:
              "1px solid rgba(255,255,255,.06)",

            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "50%",

              background:
                "linear-gradient(135deg,#2563EB,#60A5FA)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontWeight: 700,

              fontSize: 18,
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Box>

          <Box sx={{ overflow: "hidden" }}>
            <Typography
              sx={{
                fontWeight: 600,
                color: "#fff",
                fontSize: 14,
              }}
            >
              {user?.name}
            </Typography>

            <Typography
              noWrap
              sx={{
                color: "rgba(255,255,255,.5)",
                fontSize: 12,
              }}
            >
              {user?.email}
            </Typography>
          </Box>
        </Box>

        {/* Logout */}

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: "16px",

            py: 1.5,

            background: "rgba(239,68,68,.08)",

            border:
              "1px solid rgba(239,68,68,.18)",

            color: "#FCA5A5",

            transition: ".25s",

            "&:hover": {
              background: "rgba(239,68,68,.18)",
              color: "#fff",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "inherit",
              minWidth: 40,
            }}
          >
            <Logout />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: 600,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}