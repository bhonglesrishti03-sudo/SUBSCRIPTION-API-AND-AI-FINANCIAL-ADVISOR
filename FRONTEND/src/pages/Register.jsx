
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";

import { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";

export default function Register() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, password, confirmPassword } = formData;

  if (!name || !email || !password || !confirmPassword) {
    return toast.error("Please fill in all fields.");
  }

  if (password !== confirmPassword) {
    return toast.error("Passwords do not match.");
  }

  try {
    setLoading(true);

    await registerUser({
      name,
      email,
      password,
    });

    toast.success("Account created successfully! 🎉");

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    navigate("/");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration failed."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthLayout
      title="Create Your Account 🚀"
      subtitle="Start managing your subscriptions smarter with AI."
    >
      <Stack
        component="form"
        spacing={3}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={{
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        <Typography align="center" variant="body2">
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/"
            underline="hover"
          >
            Sign In
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}