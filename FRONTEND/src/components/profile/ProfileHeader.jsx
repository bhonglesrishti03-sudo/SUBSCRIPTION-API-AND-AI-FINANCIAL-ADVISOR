import { Avatar, Box, Typography } from "@mui/material";
import { glassCard } from "../../theme/glass";
import { useAuth } from "../../context/AuthContext";

export default function ProfileHeader() {
  const { user } = useAuth();

  const initial = user?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <Box
      sx={{
        ...glassCard,
        p: 4,
        borderRadius: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mb: 3,
      }}
    >
      <Avatar
        src={user?.avatar}
        sx={{
          width: 110,
          height: 110,
          fontSize: 42,
          bgcolor: "#2563EB",
          mb: 2,
        }}
      >
        {initial}
      </Avatar>

      <Typography
        variant="h4"
        fontWeight={700}
      >
        {user?.name}
      </Typography>

      <Typography
        color="text.secondary"
        mt={1}
      >
        {user?.email}
      </Typography>
    </Box>
  );
}