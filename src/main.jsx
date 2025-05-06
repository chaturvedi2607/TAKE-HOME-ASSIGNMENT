import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./app.css"; // Custom styling

const initializeDarkMode = () => {
  if (
    localStorage.getItem("darkMode") === "true" ||
    (localStorage.getItem("darkMode") === null &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Run before render
initializeDarkMode();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
// In your main App.jsx or layout component
<div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
  {/* Your app content */}
</div>;
