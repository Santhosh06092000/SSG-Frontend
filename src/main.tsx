import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider } from "@emotion/react";
import { BrowserRouter } from "react-router";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();

// In mui takes first prefrence on css file instead of default
const cache = createCache({
  key: "css",
  prepend: true,
});
// mui theme
const theme = createTheme({
  typography: {
    fontFamily: "Outfit, sans-serif",
  },
  components: {
    MuiOutlinedInput: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          borderRadius: "12px",
          borderColor: "#000",
          backgroundColor: "#fff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          minWidth: "100px",
          boxShadow: "none",
        },
      },
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  </StrictMode>
);
