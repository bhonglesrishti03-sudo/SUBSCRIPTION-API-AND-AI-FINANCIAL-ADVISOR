import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import AuthLayout from "../components/auth/AuthLayout";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      return toast.error("Please fill in all fields.");
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Welcome back! 👋");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue managing your subscriptions."
    >
      <Stack
        component="form"
        spacing={3}
        onSubmit={handleSubmit}
      >
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
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <Typography align="center" variant="body2">
          Don't have an account?{" "}
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
          >
            Register
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}