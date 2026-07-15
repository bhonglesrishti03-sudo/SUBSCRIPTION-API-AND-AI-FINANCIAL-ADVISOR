import { Box, Button } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileInfoCard from "../components/profile/ProfileInfoCard";

import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <DashboardLayout
      title="Profile"
      eyebrow="Account"
    >
      <ProfileHeader />

      <ProfileStats />

      <Box mb={4}>
        <ProfileInfoCard />
      </Box>

      <Button
        variant="contained"
        color="error"
        startIcon={<LogoutRoundedIcon />}
        onClick={handleLogout}
        sx={{
          borderRadius: "14px",
          px: 4,
          py: 1.4,
          textTransform: "none",
          fontWeight: 700,
        }}
      >
        Logout
      </Button>
    </DashboardLayout>
  );
}