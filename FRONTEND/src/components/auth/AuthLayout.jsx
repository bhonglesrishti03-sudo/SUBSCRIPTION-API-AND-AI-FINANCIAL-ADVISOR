import { Box, Typography, Chip } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 3,

        background:
          "linear-gradient(135deg,#020617 0%,#0F172A 40%,#111827 100%)",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
          opacity: .3,
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#3B82F640,transparent 70%)",
          filter: "blur(70px)",
          top: -250,
          right: -180,
        },
      }}
    >
      {/* Left Glow */}
      <Box
        sx={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#14B8A630,transparent 70%)",
          bottom: -150,
          left: -120,
          filter: "blur(60px)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,

          width: "100%",
          maxWidth: 470,

          px: 5,
          py: 5,

          borderRadius: "30px",

          background: "rgba(255,255,255,.08)",

          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",

          border: "1px solid rgba(255,255,255,.12)",

          boxShadow:
            "0 35px 80px rgba(0,0,0,.45)",

          transition: ".35s",

          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow:
              "0 45px 90px rgba(59,130,246,.18)",
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          mb={2}
        >
          <Chip
            icon={<AutoAwesomeRoundedIcon />}
            label="AI Powered"
            sx={{
              bgcolor: "rgba(59,130,246,.18)",
              color: "#93C5FD",
              fontWeight: 700,
              borderRadius: "999px",
            }}
          />
        </Box>

        <Typography
          sx={{
            textAlign: "center",
            fontSize: 38,
            fontWeight: 800,

            background:
              "linear-gradient(135deg,#60A5FA,#14B8A6)",

            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",

            letterSpacing: "-1px",
            mb: 1,
          }}
        >
          SubPilot AI
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            textAlign: "center",
            fontWeight: 700,
            fontSize: 24,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,.65)",
            textAlign: "center",
            lineHeight: 1.8,
            mb: 5,
          }}
        >
          {subtitle}
        </Typography>

        {children}

        <Typography
          sx={{
            mt: 5,
            textAlign: "center",
            color: "rgba(255,255,255,.35)",
            fontSize: 13,
          }}
        >
          Secure Authentication • End-to-End Protected
        </Typography>
      </Box>
    </Box>
  );
}