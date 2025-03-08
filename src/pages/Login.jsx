
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth/authSlice";
import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Login = () => {
  // State for login fields
  const [email, setEmail] = useState("user@example.com"); // Stores the user's email input
  const [password, setPassword] = useState("password"); // Stores the user's password input
  const [city, setCity] = useState(""); // Stores the user's city input

  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the login action including the city value
    dispatch(login({ email, password, city }));
  };

  return (
    <div
      className={`min-vh-100 d-flex flex-column align-items-center justify-content-center p-4 ${
        theme === "dark" ? "bg-dark" : "bg-light"
      }`}
    >
      {/* Theme toggle button */}
      <div className="position-absolute top-0 end-0 m-4">
        <button
          onClick={toggleTheme}
          className="btn btn-outline-primary rounded-circle p-2"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div
        className={`card shadow-lg w-100 ${theme === "dark" ? "bg-dark text-white border-secondary" : ""}`}
        style={{ maxWidth: "400px" }}
      >
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h1 className="h3 mb-2 text-primary">DoIt</h1>
            <p className={theme === "dark" ? "text-light" : "text-muted"}>
              Sign in to manage your tasks
            </p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${theme === "dark" ? "bg-dark text-white border-secondary" : ""}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${theme === "dark" ? "bg-dark text-white border-secondary" : ""}`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
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
