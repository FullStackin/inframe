// Importing necessary components and hooks from React and Material-UI
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

// App Component
function App() {
  // Redux state to determine theme mode and user authentication status
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  // JSX for rendering the application structure and routes
  return (
    <div className="app">
      {/* BrowserRouter for managing navigation */}
      <BrowserRouter>
        {/* ThemeProvider for applying the specified theme */}
        <ThemeProvider theme={theme}>
          {/* CssBaseline for applying basic styles */}
          <CssBaseline />
          {/* Routes for defining application routes */}
          <Routes>
            {/* Route for the login page */}
            <Route path="/" element={<LoginPage />} />
            {/* Route for the home page, redirecting to login if not authenticated */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            {/* Route for user profiles, redirecting to login if not authenticated */}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

// Exporting the App component as the default export
export default App;
