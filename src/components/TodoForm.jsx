// src/components/TodoForm.jsx
import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo({
      text: value,
      isComplete: false,
    });
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-500"
        placeholder="Add a new task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

export default TodoForm;
