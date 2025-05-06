// src/components/BookmarkList.jsx
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function BookmarkList({
  bookmarks,
  onDelete,
  onReorder,
  darkMode,
}) {
  const [selectedTag, setSelectedTag] = useState("All");

  const tags = ["All", ...new Set(bookmarks.flatMap((b) => b.tags || []))];

  const filtered =
    selectedTag === "All"
      ? bookmarks
      : bookmarks.filter((b) => b.tags && b.tags.includes(selectedTag));

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(filtered);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onReorder(reordered);
  };

  return (
    <div className="mt-6">
      <div className="mb-4">
        <label className="mr-2">Filter by tag:</label>
        <select
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No bookmarks yet. Add your first link above!
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="bookmarks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid sm:grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filtered.map((bookmark, index) => (
                  <Draggable
                    key={bookmark.url}
                    draggableId={bookmark.url}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-2 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {bookmark.favicon && (
                            <img
                              src={bookmark.favicon}
                              alt="favicon"
                              className="w-5 h-5"
                            />
                          )}
                          <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline truncate"
                          >
                            {bookmark.title}
                          </a>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {bookmark.summary}
                        </p>
                        {bookmark.tags && bookmark.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {bookmark.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={() => onDelete(bookmark.url)}
                          className="mt-auto text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 text-sm self-end"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
