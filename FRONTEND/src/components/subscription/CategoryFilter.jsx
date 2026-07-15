import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const categories = [
  "All",
  "Entertainment",
  "Music",
  "Productivity",
  "Education",
  "Gaming",
  "Cloud Storage",
  "Health",
  "Finance",
  "Other",
];

export default function CategoryFilter({
  value,
  onChange,
}) {
  return (
    <FormControl
      sx={{
        minWidth: 240,
        mb: 3,
      }}
    >
      <InputLabel
        sx={{
          color: "#CBD5E1",

          "&.Mui-focused": {
            color: "#60A5FA",
          },
        }}
      >
        Category
      </InputLabel>

      <Select
        value={value}
        label="Category"
        onChange={(e) =>
          onChange(e.target.value)
        }
        sx={{
          borderRadius: "14px",
          color: "#fff",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor:
              "rgba(255,255,255,.12)",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3B82F6",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3B82F6",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              background: "#111827",
              color: "#fff",
            },
          },
        }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category}
            value={category}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}