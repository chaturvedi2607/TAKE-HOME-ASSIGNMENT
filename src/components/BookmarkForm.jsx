// src/components/BookmarkForm.jsx
import React, { useState } from "react";

export default function BookmarkForm({ onAdd }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);

    try {
      // Replace this with your real API call (e.g., Jina AI + your backend)
      const response = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      const newBookmark = {
        url,
        title: data.title || "Untitled",
        favicon:
          data.favicon || "https://www.google.com/s2/favicons?domain=" + url,
        summary: data.summary || "No summary available",
      };

      onAdd(newBookmark);
      setUrl("");
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="flex-1 p-2 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          {loading ? "Saving..." : "Save Link"}
        </button>
      </div>
    </form>
  );
}
