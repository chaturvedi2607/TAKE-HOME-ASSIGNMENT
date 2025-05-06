// src/App.jsx
import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BookmarkForm from "./components/BookmarkForm";
import BookmarkList from "./components/BookmarkList";

export default function App() {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply dark mode effect whenever it changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogin = (email) => {
    setUser({ email });
  };

  const addBookmark = (newBookmark) => {
    setBookmarks([newBookmark, ...bookmarks]);
  };

  const deleteBookmark = (url) => {
    setBookmarks(bookmarks.filter((b) => b.url !== url));
  };

  const handleReorder = (reorderedList) => {
    setBookmarks(reorderedList);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {!user ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <LoginForm onLogin={handleLogin} />
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">🔗 Link Saver + Auto-Summary</h1>

            <button
              onClick={toggleDarkMode}
              className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          <BookmarkForm onAdd={addBookmark} />
          <BookmarkList
            bookmarks={bookmarks}
            onDelete={deleteBookmark}
            onReorder={handleReorder}
            darkMode={darkMode}
          />
        </div>
      )}
    </main>
  );
}
