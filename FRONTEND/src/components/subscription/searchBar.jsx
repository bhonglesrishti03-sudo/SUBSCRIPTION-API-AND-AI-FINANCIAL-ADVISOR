import { Box, InputAdornment, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function SearchBar({ value, onChange }) {
  return (
    <Box mb={4}>
      <TextField
        fullWidth
        placeholder="Search subscriptions..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ color: "#94A3B8" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 56,
            borderRadius: "18px",
            color: "#fff",
            background: "rgba(255,255,255,.05)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,.08)",

            "& fieldset": {
              border: "none",
            },

            "&:hover": {
              background: "rgba(255,255,255,.07)",
            },

            "& input::placeholder": {
              color: "rgba(255,255,255,.45)",
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  );
}