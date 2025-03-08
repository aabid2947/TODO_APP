"use client";

import { useDispatch } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { useTheme } from "../contexts/ThemeContext";
import { Home, CheckSquare, Calendar, Star, LogOut, Plus } from "lucide-react";

const Sidebar = ({ user, activeView = "all", onViewChange }) => {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Calculate progress percentage (mock data for demonstration)
  const totalTasks = 11;
  const completedTasks = 7;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  // Inline style objects
  const sidebarContainerStyle = {
    backgroundColor: theme === "dark" ? "#292929" : "#f8f9fa",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const navLinkStyle = {
    color: theme === "dark" ? "white" : "#333",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    marginBottom: "0.25rem",
    transition: "all 0.2s ease",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };

  const activeNavLinkStyle = {
    ...navLinkStyle,
    backgroundColor: "rgb(36, 46, 36)",
    color: "#4caf50",
  };

  const addTaskBtnStyle = {
    width: "100%",
    background: "none",
    border: `1px dashed ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
    color: theme === "dark" ? "white" : "#333",
    padding: "0.75rem",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    cursor: "pointer",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  const todayTasksStyle = {
    backgroundColor: theme === "dark" ? "#212121" : "#e9ecef",
    borderRadius: "12px",
    color: theme === "dark" ? "white" : "#333",
    padding: "1rem",
    marginBottom: "1rem",
  };

  const taskCountStyle = {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    color: "#4caf50",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "0.875rem",
  };

  const progressCircleContainerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "1rem 0",
  };

  const progressCircleStyle = {
    position: "relative",
    width: "100px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const progressPercentageStyle = {
    position: "absolute",
    fontSize: "1.25rem",
    fontWeight: 500,
    color: "#4caf50",
  };

  const logoutButtonStyle = {
    background: "none",
    border: "none",
    color: "red",
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
  };

  return (
    <div style={sidebarContainerStyle} className="h-100">
      {/* Header */}
      <div style={{ padding: "1rem", marginBottom: "1rem" }}>
        <div className="d-flex align-items-center">
          <img
            src={user?.avatar || "/placeholder.svg?height=40&width=40"}
            alt="User avatar"
            className="rounded-circle me-2"
            width="40"
            height="40"
          />
          <div>
            <h6 style={{ margin: 0, color: theme === "dark" ? "white" : "#333" }}>
              {user?.name || "Hey, ABCD"}
            </h6>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
        <nav className="nav flex-column">
          <div 
            style={activeView === "all" ? activeNavLinkStyle : navLinkStyle}
            onClick={() => onViewChange("all")}
          >
            <CheckSquare size={18} style={{ marginRight: "0.5rem" }} />
            <span>All Tasks</span>
          </div>
          <div 
            style={activeView === "important" ? activeNavLinkStyle : navLinkStyle}
            onClick={() => onViewChange("important")}
          >
            <Star size={18} style={{ marginRight: "0.5rem" }} />
            <span>Important</span>
          </div>
          <div 
            style={activeView === "planned" ? activeNavLinkStyle : navLinkStyle}
            onClick={() => onViewChange("planned")}
          >
            <Calendar size={18} style={{ marginRight: "0.5rem" }} />
            <span>Planned</span>
          </div>
          <div 
            style={activeView === "assigned" ? activeNavLinkStyle : navLinkStyle}
            onClick={() => onViewChange("assigned")}
          >
            <Home size={18} style={{ marginRight: "0.5rem" }} />
            <span>Assigned to me</span>
          </div>
        </nav>

        <button style={addTaskBtnStyle}>
          <Plus size={18} style={{ marginRight: "0.5rem" }} />
          Add List
        </button>

        <div style={todayTasksStyle}>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ marginBottom: "1rem" }}
          >
            <h6 style={{ margin: 0 }}>Today Tasks</h6>
            <span style={taskCountStyle}>{totalTasks}</span>
          </div>

          <div style={progressCircleContainerStyle}>
            <div style={progressCircleStyle}>
              <svg
                viewBox="0 0 36 36"
                style={{
                  transform: "rotate(-90deg)",
                  width: "100%",
                  height: "100%",
                }}
              >
                <path
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={theme === "dark" ? "#2b2b2b" : "#e0e0e0"}
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4caf50"
                  strokeWidth="3"
                  strokeDasharray={`${progressPercentage}, 100`}
                />
              </svg>
              <div style={progressPercentageStyle}>
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div style={{ marginTop: "auto", padding: "1rem" }}>
        <button
          onClick={handleLogout}
          style={logoutButtonStyle}
          className="d-flex align-items-center mb-2"
        >
          <LogOut size={18} style={{ marginRight: "0.5rem" }} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
