import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

function TodoItem({ todo, index, toggleComplete, removeTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [error, setError] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newText.trim() === "") {
      setError("Task cannot be empty.");
      return;
    }
    editTodo(index, newText);
    setIsEditing(false);
    setError("");
  };

  const handleCancel = () => {
    setNewText(todo.text);
    setIsEditing(false);
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <CSSTransition
      in={todo.isComplete}
      timeout={500}
      classNames="toggle-complete"
      unmountOnExit={false}
    >
      <li
        className={`flex flex-col items-start justify-between p-2 border-b border-gray-300 dark:border-gray-700 transition-colors duration-500 ${
          todo.isComplete ? "completed" : "not-completed"
        }`}
      >
        {isEditing ? (
          <>
            <input
              type="text"
              value={newText}
              onChange={(e) => {
                setNewText(e.target.value);
                if (e.target.value.trim() !== "") {
                  setError("");
                }
              }}
              onBlur={handleSave}
              onKeyPress={handleKeyPress}
              className="flex-grow bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex space-x-2 mt-2">
              <button onClick={handleSave} className="text-blue-500">
                Save
              </button>
              <button onClick={handleCancel} className="text-gray-500">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <span
              className="cursor-pointer"
              onClick={() => toggleComplete(index)}
            >
              {todo.text}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              {todo.category}
            </span>
            <div className="flex space-x-2 mt-2">
              <button onClick={handleEdit} className="text-blue-500">
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded transition-colors duration-500 hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTodo(index);
                }}
              >
                Remove
              </button>
            </div>
          </>
        )}
      </li>
    </CSSTransition>
  );
}

export default TodoItem;
