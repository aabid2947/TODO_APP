"use client"; // Indicates that this file is a client component (common in frameworks like Next.js)

import { createContext, useContext, useState, useEffect } from "react";

// Create a new context for theme management.
// This context will be used to provide and consume theme-related values.
const ThemeContext = createContext();

// ThemeProvider component that wraps the application or part of it to provide theme state.
export function ThemeProvider({ children }) {
  // Initialize theme state by checking localStorage.
  // If a saved theme exists, use it; otherwise, default to "dark".
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  // useEffect to update localStorage and the document's data attribute whenever the theme changes.
  useEffect(() => {
    // Save the current theme to localStorage for persistence.
    localStorage.setItem("theme", theme);
    // Update the document's attribute (useful for CSS or frameworks like Bootstrap)
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]); // Dependency array: run this effect whenever 'theme' changes

  // Function to toggle the theme between "light" and "dark".
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Provide the current theme and toggleTheme function to any child components that consume this context.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to easily access the ThemeContext values in any functional component.
export function useTheme() {
  const context = useContext(ThemeContext);
  // Throw an error if the hook is used outside of the ThemeProvider.
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
