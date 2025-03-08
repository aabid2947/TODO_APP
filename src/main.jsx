import React from "react";
// Import the new ReactDOM client API for creating the root element
import ReactDOM from "react-dom/client";
// Import Provider to integrate Redux store with your React app
import { Provider } from "react-redux";
// Import the Redux store
import { store } from "./store";
// Import the main App component which holds your application logic and routes
import App from "./App";
// Import Bootstrap's JavaScript bundle for dynamic components (e.g., modals, dropdowns)
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Import custom CSS styles for your application
import "./App.css";

// Select the root element in the HTML where the React app will be mounted
const rootElement = document.getElementById("root");
// Throw an error if the root element is not found to avoid silent failures
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Create a React root and render the application into the selected DOM node
ReactDOM.createRoot(rootElement).render(
  // React.StrictMode helps to highlight potential issues in the app during development
  <React.StrictMode>
    {/* The Provider makes the Redux store available to the rest of your app */}
    <Provider store={store}>
      {/* The main App component contains your routes and overall application structure */}
      <App />
    </Provider>
  </React.StrictMode>
);
