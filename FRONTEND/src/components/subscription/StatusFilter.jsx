import {
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const filters = [
  "All",
  "Active",
  "Cancelled",
  "Expired",
];

export default function StatusFilter({
  value,
  onChange,
}) {
  return (
    <ToggleButtonGroup
      exclusive
      value={value}
      onChange={(e, newValue) => {
        if (newValue) onChange(newValue);
      }}
      sx={{
        mb: 3,
        gap: 1,
        flexWrap: "wrap",

        "& .MuiToggleButton-root": {
          borderRadius: "12px !important",
          border: "1px solid rgba(255,255,255,.08)",
          color: "#CBD5E1",
          textTransform: "none",
          px: 2.5,

          "&.Mui-selected": {
            background: "#2563EB",
            color: "#fff",

            "&:hover": {
              background: "#1D4ED8",
            },
          },
        },
      }}
    >
      {filters.map((filter) => (
        <ToggleButton
          key={filter}
          value={filter}
        >
          {filter}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}