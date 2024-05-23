// src/App.jsx
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaCheckCircle } from "react-icons/fa";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true" || false;
  });
  const [showTodoFeedback, setShowTodoFeedback] = useState(false);
  const [showInProgressFeedback, setShowInProgressFeedback] = useState(false);
  const [showCompletedFeedback, setShowCompletedFeedback] = useState(false);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
    showFeedback("todo");
  };

  const moveToInProgress = (index) => {
    const newTodos = [...todos];
    const [movedTodo] = newTodos.splice(index, 1);
    setTodos(newTodos);
    setInProgress([...inProgress, movedTodo]);
    showFeedback("inProgress");
  };

  const moveToCompleted = (index) => {
    const newInProgress = [...inProgress];
    const [movedTodo] = newInProgress.splice(index, 1);
    movedTodo.isComplete = true;
    setInProgress(newInProgress);
    setCompleted([...completed, movedTodo]);
    showFeedback("completed");
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const removeTodo = (list, setList, index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const showFeedback = (type) => {
    if (type === "todo") {
      setShowTodoFeedback(true);
      setTimeout(() => setShowTodoFeedback(false), 2000);
    } else if (type === "inProgress") {
      setShowInProgressFeedback(true);
      setTimeout(() => setShowInProgressFeedback(false), 2000);
    } else if (type === "completed") {
      setShowCompletedFeedback(true);
      setTimeout(() => setShowCompletedFeedback(false), 2000);
    }
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`${
        isDarkMode ? "dark" : ""
      } min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 p-4`}
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleDarkMode}
          className="text-2xl text-gray-900 dark:text-white transition-colors duration-500"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-500">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-500">
          To-Do List
        </h1>
        <TodoForm addTodo={addTodo} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              To Do
            </h2>
            <TodoList
              todos={todos}
              toggleComplete={moveToInProgress}
              removeTodo={(index) => removeTodo(todos, setTodos, index)}
              editTodo={editTodo}
            />
            {showTodoFeedback && (
              <FaCheckCircle className="absolute top-0 right-0 text-green-500 text-2xl animate-bounce" />
            )}
          </div>
          <div className="relative">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              In Progress
            </h2>
            <TodoList
              todos={inProgress}
              toggleComplete={moveToCompleted}
              removeTodo={(index) =>
                removeTodo(inProgress, setInProgress, index)
              }
            />
            {showInProgressFeedback && (
              <FaCheckCircle className="absolute top-0 right-0 text-green-500 text-2xl animate-bounce" />
            )}
          </div>
          <div className="relative">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Completed
            </h2>
            <TodoList
              todos={completed}
              toggleComplete={() => {}}
              removeTodo={(index) => removeTodo(completed, setCompleted, index)}
            />
            {showCompletedFeedback && (
              <FaCheckCircle className="absolute top-0 right-0 text-green-500 text-2xl animate-bounce" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
