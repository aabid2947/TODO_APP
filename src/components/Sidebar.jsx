import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { useTheme } from "../contexts/ThemeContext";
import { Home, CheckSquare, Calendar, Star, LogOut } from "lucide-react";

const Sidebar = ({ user, activeView = "all", onViewChange }) => {
  // Initialize dispatch function from Redux.
  const dispatch = useDispatch();

  // Retrieve the current theme from the ThemeContext.
  const { theme } = useTheme();

  // Retrieve tasks from the Redux store.
  const { tasks } = useSelector((state) => state.tasks);
  // Calculate total number of tasks.
  const totalTasks = tasks?.length || 0;
  // Calculate number of tasks that are completed.
  const completedTasks = tasks?.filter((task) => task.completed).length || 0;
  // Calculate progress percentage (completed tasks over total tasks).
  const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  // Define styles for the sidebar container.
  const sidebarContainerStyle = {
    backgroundColor: theme === "dark" ? "#292929" : "#f8f9fa",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflowY: "auto", // Enable vertical scrolling if content overflows.
  };

  // Default style for each navigation link.
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

  // Style overrides for an active navigation link.
  const activeNavLinkStyle = {
    ...navLinkStyle,
    backgroundColor: "#4caf50",
    color: "rgb(245, 244, 244)",
  };

  // Style for the "Today Tasks" card container.
  const todayTasksStyle = {
    backgroundColor: theme === "dark" ? "#212121" : "#e9ecef",
    borderRadius: "12px",
    color: theme === "dark" ? "white" : "#333",
    padding: "1rem",
    marginBottom: "1rem",
  };

  // Style for displaying the task count badge.
  const taskCountStyle = {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    color: "#4caf50",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "0.875rem",
  };

  // Container style for the progress circle.
  const progressCircleContainerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "1rem 0",
  };

  // Style for the progress circle SVG container.
  const progressCircleStyle = {
    position: "relative",
    width: "100px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Centered text inside the progress circle.
  const progressCenterStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  };

  // Style for the logout button.
  const logoutButtonStyle = {
    background: "none",
    border: "none",
    color: "red",
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    marginTop: "1rem",
  };

  // Handler function to log out the user.
  // Dispatches the logout action from the auth slice.
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={sidebarContainerStyle} className="h-100">
      {/* Header Section: Displays user avatar and name */}
      <div style={{ padding: "1rem", marginBottom: "1rem" }}>
        <div className="d-flex align-items-center">
          <img
            // Display user avatar. If user image is unavailable, use a placeholder.
            src={"/assets/user.png" || "/placeholder.svg?height=40&width=40"}
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

      {/* Navigation Links Section */}
      <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
        <nav className="nav flex-column">
          {/* All Tasks Navigation Link */}
          <div
            style={activeView === "all" ? activeNavLinkStyle : navLinkStyle}
            onClick={() => onViewChange("all")}
          >
            <CheckSquare size={18} style={{ marginRight: "0.5rem" }} />
            <span>All Tasks</span>
          </div>
          {/* Important Tasks Navigation Link */}
          <div
            style={activeView === "important" ? activeNavLinkStyle : navLinkStyle}
            onClick={() => onViewChange("important")}
          >
            <Star size={18} style={{ marginRight: "0.5rem" }} />
            <span>Important</span>
          </div>
          {/* Planned Tasks Navigation Link */}
          <div
            style={activeView === "planned" ? activeNavLinkStyle : navLinkStyle}
            onClick={() => onViewChange("planned")}
          >
            <Calendar size={18} style={{ marginRight: "0.5rem" }} />
            <span>Planned</span>
          </div>
          {/* Assigned to Me Navigation Link */}
          <div
            style={activeView === "assigned" ? activeNavLinkStyle : navLinkStyle}
            onClick={() => onViewChange("assigned")}
          >
            <Home size={18} style={{ marginRight: "0.5rem" }} />
            <span>Assigned to me</span>
          </div>
        </nav>

        {/* Today Tasks Card */}
        <div style={todayTasksStyle}>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ marginBottom: "1rem" }}
          >
            <h6 style={{ margin: 0 }}>Today Tasks</h6>
            {/* Display total tasks count */}
            <span style={taskCountStyle}>{totalTasks}</span>
          </div>

          {/* Progress Circle displaying completion percentage */}
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
                {/* Background circle */}
                <path
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={theme === "dark" ? "#2b2b2b" : "#e0e0e0"}
                  strokeWidth="3"
                />
                {/* Progress circle */}
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
              {/* Centered text showing percentage and task count */}
              <div style={progressCenterStyle}>
                <div style={{ fontSize: "1.25rem", fontWeight: 500, color: "#4caf50" }}>
                  {Math.round(progressPercentage)}%
                </div>
                <div style={{ fontSize: "0.875rem", color: theme === "dark" ? "#fff" : "#333" }}>
                  {completedTasks} / {totalTasks}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button placed just below the Today Tasks card */}
        <button onClick={handleLogout} style={logoutButtonStyle} className="d-flex align-items-center">
          <LogOut size={18} style={{ marginRight: "0.5rem" }} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
