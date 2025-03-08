import React from "react";
import { Menu, Search, Settings, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import Logo from "../assets/logo.png"

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <style>{`
        .main-navbar {
          background-color: ${theme === "dark" ? "#292929" : "#f8f9fa"};
          height: 48px;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
        }
        .nav-icon-btn {
          background: none;
          border: none;
          color: ${theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"};
          padding: 0.5rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .nav-icon-btn:hover {
          color: ${theme === "dark" ? "white" : "black"};
          background-color: ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
        }
      `}</style>
      <nav className="main-navbar">
        {/* Left side: Menu button + Logo + Brand */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="nav-icon-btn"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu size={20} />
          </button>

          {/* Logo + "DoIt" brand */}
          <div className="d-flex align-items-center">
            {/* Update /logo.svg to your actual icon path */}
            <img
              src={Logo}
              alt="DoIt Icon"
              style={{ width: "36px", height: "30px" }}
            />
            <span
              style={{
                color: "rgb(36,46,36)",
                marginLeft: "8px",
                fontWeight: 700,
              }}
            >
              DoIt
            </span>
          </div>
        </div>

        {/* Right side: Search, Settings, Theme Toggle */}
        <div className="d-flex align-items-center gap-3">
          <button className="nav-icon-btn">
            <Search size={20} />
          </button>
          <button className="nav-icon-btn">
            <Settings size={20} />
          </button>
          <button
            className="nav-icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
