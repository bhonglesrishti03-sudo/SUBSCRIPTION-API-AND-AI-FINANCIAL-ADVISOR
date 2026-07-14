import { Box, Typography, Paper } from "@mui/material";

export default function AuthLayout({ title, subtitle, children }) {
  return (
   <Box
  sx={{
    minHeight: "100vh",
    background: `
      linear-gradient(
        135deg,
        #0F172A 0%,
        #1E3A8A 35%,
        #2563EB 65%,
        #38BDF8 100%
      )
    `,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    px: 2,
    backgroundSize: "200% 200%",
animation: "gradient 15s ease infinite",
  }}
>
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 430,
          borderRadius: 4,
         p: {
  xs: 3.5,
  sm: 5,
},
        }}
      >
        <Typography
  variant="h3"
  align="center"
  sx={{
    fontWeight: 800,
    color: "#2563EB",
    letterSpacing: "-1px",
    mb: 1,
  }}
>
  SubPilot AI
</Typography>

        <Typography
          variant="h6"
          align="center"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
  variant="body2"
  color="text.secondary"
  align="center"
  sx={{
    mb: 5,
    mt: 1,
    lineHeight: 1.7,
  }}
>
          {subtitle}
        </Typography>

        {children}
      </Paper>
    </Box>
  );
}