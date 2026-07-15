import { TextField, InputAdornment } from "@mui/material";

export default function GlassTextField({
  icon,
  endIcon,
  InputProps = {},
  ...props
}) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      {...props}
      InputProps={{
        ...InputProps,
        startAdornment: icon ? (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ) : (
          InputProps.startAdornment
        ),

        endAdornment: endIcon ? (
          <InputAdornment position="end">
            {endIcon}
          </InputAdornment>
        ) : (
          InputProps.endAdornment
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 60,
          borderRadius: "18px",
          background: "rgba(255,255,255,.05)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          transition: "all .25s ease",

          "& fieldset": {
            borderColor: "rgba(255,255,255,.12)",
          },

          "&:hover fieldset": {
            borderColor: "#60A5FA",
          },

          "&.Mui-focused": {
            background: "rgba(255,255,255,.08)",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#3B82F6",
            borderWidth: 2,
          },

          /* Chrome Autofill Fix */
          "& input:-webkit-autofill": {
            WebkitBoxShadow:
              "0 0 0px 1000px rgba(255,255,255,.05) inset",
            WebkitTextFillColor: "#fff",
            caretColor: "#fff",
            borderRadius: "18px",
            transition: "background-color 99999s ease-in-out 0s",
          },

          "& input:-webkit-autofill:hover": {
            WebkitBoxShadow:
              "0 0 0px 1000px rgba(255,255,255,.06) inset",
          },

          "& input:-webkit-autofill:focus": {
            WebkitBoxShadow:
              "0 0 0px 1000px rgba(255,255,255,.08) inset",
          },
        },

        "& .MuiInputBase-input": {
          color: "#fff",
          fontSize: 15,
          fontWeight: 500,
        },

        "& .MuiInputLabel-root": {
          color: "rgba(255,255,255,.6)",
        },

        "& .MuiInputLabel-root.Mui-focused": {
          color: "#60A5FA",
        },

        "& .MuiSvgIcon-root": {
          color: "rgba(255,255,255,.65)",
        },
      }}
    />
  );
}