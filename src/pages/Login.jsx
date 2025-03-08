import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth/authSlice";
import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Login = () => {
  // Only state for the city field is needed since email and password are hardcoded.
  const [city, setCity] = useState("");

  // Initialize dispatch function from Redux.
  const dispatch = useDispatch();

  // Retrieve error and loading state from the auth slice.
  const { error, loading } = useSelector((state) => state.auth);

  // Get current theme and a function to toggle the theme from ThemeContext.
  const { theme, toggleTheme } = useTheme();

  // Handler for form submission.
  // It dispatches the login action with hardcoded credentials and the user-entered city.
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: "user@example.com", password: "password", city }));
  };

  return (
    // Container div centers the form vertically and horizontally.
    <div
      className={`min-vh-100 d-flex flex-column align-items-center justify-content-center p-4 ${
        theme === "dark" ? "bg-dark" : "bg-light"
      }`}
    >
      {/* Theme toggle button positioned at the top-right corner */}
      <div className="position-absolute top-0 end-0 m-4">
        <button
          onClick={toggleTheme}
          className="btn btn-outline-primary rounded-circle p-2"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Card container for the login form */}
      <div
        className={`card shadow-lg w-100 ${theme === "dark" ? "bg-dark text-white border-secondary" : ""}`}
        style={{ maxWidth: "400px" }}
      >
        <div className="card-body p-4">
          {/* Header section with app name and a brief description */}
          <div className="text-center mb-4">
            <h1 className="h3 mb-2 text-primary">DoIt</h1>
            <p className={theme === "dark" ? "text-light" : "text-muted"}>
              Sign in to manage your tasks
            </p>
          </div>

          {/* Display error message if login fails */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit}>
            {/* Input field for the city */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className={`form-control ${theme === "dark" ? "bg-dark text-white border-secondary" : ""}`}
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                required
              />
            </div>
            {/* Submit button with a loading indicator */}
            <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
