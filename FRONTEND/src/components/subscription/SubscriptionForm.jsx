import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

const initialState = {
  name: "",
  price: "",
  currency: "USD",
  frequency: "monthly",
  category: "Entertainment",
  paymentMethod: "Credit Card",
  startDate: "",
  status: "active",
};

const currencies = ["USD", "INR", "EUR", "GBP"];

const frequencies = [
  "daily",
  "weekly",
  "monthly",
  "yearly",
];

const categories = [
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

const paymentMethods = [
  "Credit Card",
  "Debit Card",
  "UPI",
  "Net Banking",
  "PayPal",
];

const statuses = [
  "active",
  "cancelled",
  "expired",
];

export default function SubscriptionForm({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        startDate: initialData.startDate?.split("T")[0],
      });
    } else {
      setFormData(initialState);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "price"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
   <Dialog
  open={open}
  onClose={onClose}
  maxWidth="md"
  fullWidth
  BackdropProps={{
    sx: {
      background: "rgba(2,6,23,.82)",
      backdropFilter: "blur(10px)",
    },
  }}
  PaperProps={{
    sx: {
      borderRadius: "26px",
      background: "#111827",
      border: "1px solid rgba(255,255,255,.08)",
      boxShadow: "0 30px 80px rgba(0,0,0,.55)",
      color: "#fff",
      overflow: "hidden",
    },
  }}
>
      <DialogTitle
  sx={{
    fontSize: 28,
    fontWeight: 800,
    color: "#fff",
    borderBottom: "1px solid rgba(255,255,255,.08)",
    pb: 2,
  }}
>
  {initialData ? "Edit Subscription" : "Add Subscription"}
</DialogTitle>
      <DialogContent
       sx={{
    pt: 3,
    background: "#111827",
  }}>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subscription Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
               sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      color: "#fff",

      "& fieldset": {
        borderColor: "rgba(255,255,255,.12)",
      },

      "&:hover fieldset": {
        borderColor: "#3B82F6",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#3B82F6",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#CBD5E1",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#60A5FA",
    },
  }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
               sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      color: "#fff",

      "& fieldset": {
        borderColor: "rgba(255,255,255,.12)",
      },

      "&:hover fieldset": {
        borderColor: "#3B82F6",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#3B82F6",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#CBD5E1",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#60A5FA",
    },
  }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
               sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      color: "#fff",

      "& fieldset": {
        borderColor: "rgba(255,255,255,.12)",
      },

      "&:hover fieldset": {
        borderColor: "#3B82F6",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#3B82F6",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#CBD5E1",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#60A5FA",
    },
  }}
            >
              {currencies.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
               sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      color: "#fff",

      "& fieldset": {
        borderColor: "rgba(255,255,255,.12)",
      },

      "&:hover fieldset": {
        borderColor: "#3B82F6",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#3B82F6",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#CBD5E1",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#60A5FA",
    },
  }}
            >
              {frequencies.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
               sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      color: "#fff",

      "& fieldset": {
        borderColor: "rgba(255,255,255,.12)",
      },

      "&:hover fieldset": {
        borderColor: "#3B82F6",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#3B82F6",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#CBD5E1",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#60A5FA",
    },
  }}
            >
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Payment Method"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
               sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      color: "#fff",

      "& fieldset": {
        borderColor: "rgba(255,255,255,.12)",
      },

      "&:hover fieldset": {
        borderColor: "#3B82F6",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#3B82F6",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#CBD5E1",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#60A5FA",
    },
  }}
            >
              {paymentMethods.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
               sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      color: "#fff",

      "& fieldset": {
        borderColor: "rgba(255,255,255,.12)",
      },

      "&:hover fieldset": {
        borderColor: "#3B82F6",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#3B82F6",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#CBD5E1",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#60A5FA",
    },
  }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
               sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      color: "#fff",

      "& fieldset": {
        borderColor: "rgba(255,255,255,.12)",
      },

      "&:hover fieldset": {
        borderColor: "#3B82F6",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#3B82F6",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#CBD5E1",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#60A5FA",
    },
  }}
            >
              {statuses.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions  sx={{
    p: 3,
    borderTop: "1px solid rgba(255,255,255,.08)",
    background: "#111827",
  }}>
       <Button
  onClick={onClose}
  sx={{
    color: "#CBD5E1",
  }}
>
  Cancel
</Button>

<Button
  variant="contained"
  onClick={handleSubmit}
  sx={{
    px: 4,
    borderRadius: "12px",
  }}
>
  {initialData ? "Update" : "Create"}
</Button>
      </DialogActions>
    </Dialog>
  );
}