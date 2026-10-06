import { createTheme } from "@mui/material/styles";

export const tokens = {
  // Dark backgrounds
  dark: "#070B18",
  dark2: "#0F172A",
  dark3: "#111827",

  ink: "#070B18",
  inkSoft: "#111827",

  // Light backgrounds
  light: "#F8FAFC",
  light2: "#F1F5F9",
  light3: "#E2E8F0",

  // Surfaces
  paper: "#070B18",
  surface: "rgba(255,255,255,.05)",

  // Glass
  // Glass
glass: "rgba(255,255,255,.07)",
glassHover: "rgba(255,255,255,.10)",

glassBorder: "rgba(255,255,255,.10)",
border: "rgba(255,255,255,.10)",

  // Text - dark mode
  textPrimary: "#FFFFFF",
  textSecondary: "#CBD5E1",
  textTertiary: "#94A3B8",

  // Text - light mode
  textPrimaryLight: "#0F172A",
  textSecondaryLight: "#475569",
  textTertiaryLight: "#64748B",

  // Accent Colors
  emerald: "#22C55E",
  emeraldSoft: "rgba(34,197,94,.15)",

  blue: "#3B82F6",
  blueSoft: "rgba(59,130,246,.15)",

  violet: "#8B5CF6",
  violetSoft: "rgba(139,92,246,.18)",

  orange: "#F59E0B",
  orangeSoft: "rgba(245,158,11,.18)",

  coral: "#EF4444",
  coralSoft: "rgba(239,68,68,.15)",

  // Shadows
  cardShadow: "0 20px 45px rgba(0,0,0,.35)",

  glow: "0 0 35px rgba(59,130,246,.20)",

  // Fonts
  fontDisplay: "'Inter', sans-serif",
  fontBody: "'Inter', sans-serif",
  fontMono: "'IBM Plex Mono', monospace",
};

export const getTheme = (mode = "dark") => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,

      background: {
        default: isDark ? tokens.dark : tokens.light,
        paper: isDark ? tokens.dark2 : "#FFFFFF",
      },

      primary: {
        main: tokens.blue,
      },

      secondary: {
        main: tokens.violet,
      },

      success: {
        main: tokens.emerald,
      },

      error: {
        main: tokens.coral,
      },

      divider: isDark
        ? tokens.glassBorder
        : "#E2E8F0",

      text: {
        primary: isDark
          ? tokens.textPrimary
          : tokens.textPrimaryLight,

        secondary: isDark
          ? tokens.textSecondary
          : tokens.textSecondaryLight,
      },
    },

    shape: {
      borderRadius: 20,
    },

    typography: {
      fontFamily: tokens.fontBody,

      h1: {
        fontWeight: 800,
      },

      h2: {
        fontWeight: 800,
      },

      h3: {
        fontWeight: 700,
      },

      h4: {
        fontWeight: 700,
      },

      h5: {
        fontWeight: 700,
      },

      h6: {
        fontWeight: 700,
      },

      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },

    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
  });
};

export default getTheme("dark");