import {
  Box,
  Divider,
  Typography,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

import { glassCard } from "../../theme/glass";
import { useAuth } from "../../context/AuthContext";

export default function ProfileInfoCard() {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        ...glassCard,
        p: 5,
        borderRadius: "24px",
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 14px 32px rgba(37,99,235,.15)",
        },
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={1}
      >
        Account Information
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: 4,
        }}
      >
        View your personal account information.
      </Typography>

      {/* Name */}

      <Box
        display="flex"
        alignItems="center"
        gap={2}
      >
        <PersonRoundedIcon
          sx={{
            color: "#60A5FA",
            fontSize: 26,
          }}
        />

        <Box>
          <Typography
            color="text.secondary"
            fontSize={13}
          >
            Full Name
          </Typography>

          <Typography
            fontWeight={700}
            fontSize={16}
          >
            {user?.name}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Email */}

      <Box
        display="flex"
        alignItems="center"
        gap={2}
      >
        <EmailRoundedIcon
          sx={{
            color: "#60A5FA",
            fontSize: 26,
          }}
        />

        <Box>
          <Typography
            color="text.secondary"
            fontSize={13}
          >
            Email Address
          </Typography>

          <Typography
            fontWeight={700}
            fontSize={16}
          >
            {user?.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Account Status */}

      <Box
        display="flex"
        alignItems="center"
        gap={2}
      >
        <VerifiedUserRoundedIcon
          sx={{
            color: "#22C55E",
            fontSize: 26,
          }}
        />

        <Box>
          <Typography
            color="text.secondary"
            fontSize={13}
          >
            Account Status
          </Typography>

          <Typography
            fontWeight={700}
            fontSize={16}
            color="#22C55E"
          >
            Verified
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}