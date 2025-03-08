import { useEffect } from "react";
// Import BrowserRouter (renamed as Router), Routes, Route, and Navigate for routing
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Import Redux hooks for dispatching actions and accessing state
import { useDispatch, useSelector } from "react-redux";
// Import ThemeProvider to wrap the app with theme context
import { ThemeProvider } from "./contexts/ThemeContext";
// Import the async thunk to check authentication status from Redux auth slice
import { checkAuthStatus } from "./store/auth/authSlice";
// Import page components for login and dashboard views
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// Import Bootstrap and custom CSS styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // Initialize the Redux dispatch function
  const dispatch = useDispatch();
  // Get authentication state from the Redux store: whether user is authenticated and loading status
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // On component mount, dispatch checkAuthStatus to determine if user is logged in
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // While authentication status is loading, display a centered spinner
  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Once loading is complete, render the application with theme context and routing
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* 
              Route for the login page:
              - If the user is authenticated, redirect to the dashboard.
              - Otherwise, render the Login component.
          */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          {/* 
              Route for the dashboard (home page):
              - If the user is authenticated, render the Dashboard component.
              - Otherwise, redirect to the login page.
          */}
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
