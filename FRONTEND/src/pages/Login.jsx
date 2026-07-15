import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Stack,
  Typography,
  Link,
  IconButton,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import {
  EmailRounded,
  LockRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import AuthLayout from "../components/auth/AuthLayout";
import GlassTextField from "../components/auth/GlassTextField";
import AuthButton from "../components/auth/AuthButton";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields.");
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      const { user, token } = response.data.data;

      login(user, token);

      toast.success(`Welcome back, ${user.name}!`);

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password."
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
        spacing={3}
        component="form"
        onSubmit={handleSubmit}
      >
        <GlassTextField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          icon={<EmailRounded />}
        />

        <GlassTextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          icon={<LockRounded />}
          endIcon={
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
          }
        />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                sx={{
                  color: "#a6a6a6",
                  "&.Mui-checked": {
                    color: "#9fa2a7",
                  },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "rgba(255,255,255,.75)",
                  fontSize: 14,
                }}
              >
                Remember me
              </Typography>
            }
          />

          <Link
            component="button"
            underline="hover"
            sx={{
              color: "#60A5FA",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Forgot Password?
          </Link>
        </Box>

        <AuthButton
          type="submit"
          loading={loading}
        >
          Sign In
        </AuthButton>

        <Typography
          align="center"
          sx={{
            color: "rgba(255,255,255,.75)",
          }}
        >
          Don't have an account?{" "}
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            sx={{
              color: "#60A5FA",
              fontWeight: 700,
            }}
          >
            Create Account
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}