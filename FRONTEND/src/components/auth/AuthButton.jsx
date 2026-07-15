import { Button, CircularProgress } from "@mui/material";

export default function AuthButton({
  loading,
  children,
  ...props
}) {
  return (
    <Button
      variant="contained"
      fullWidth
      disableElevation
      {...props}
      sx={{
        height: 56,

        borderRadius: "18px",

        fontSize: 16,

        fontWeight: 700,

        letterSpacing: ".3px",

        background:
          "linear-gradient(135deg,#2563EB,#3B82F6)",

        transition: ".3s",

        "&:hover": {
          background:
            "linear-gradient(135deg,#1D4ED8,#2563EB)",

          transform: "translateY(-2px)",

          boxShadow:
            "0 12px 30px rgba(37,99,235,.35)",
        },
      }}
    >
      {loading ? (
        <CircularProgress
          size={24}
          sx={{
            color: "#fff",
          }}
        />
      ) : (
        children
      )}
    </Button>
  );
}