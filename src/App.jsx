import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaCheckCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [inProgress, setInProgress] = useState(
    () => JSON.parse(localStorage.getItem("inProgress")) || []
  );
  const [completed, setCompleted] = useState(
    () => JSON.parse(localStorage.getItem("completed")) || []
  );
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true" || false;
  });
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showTodoFeedback, setShowTodoFeedback] = useState(false);
  const [showInProgressFeedback, setShowInProgressFeedback] = useState(false);
  const [showCompletedFeedback, setShowCompletedFeedback] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("inProgress", JSON.stringify(inProgress));
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [todos, inProgress, completed]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
    showFeedback("todo");
    toast.success("New task added!", { position: "top-right" });
  };

  const moveToInProgress = (index) => {
    const newTodos = [...todos];
    const [movedTodo] = newTodos.splice(index, 1);
    setTodos(newTodos);
    setInProgress([...inProgress, movedTodo]);
    showFeedback("inProgress");
    toast.info("Task moved to In Progress", { position: "top-right" });
  };

  const moveToCompleted = (index) => {
    const newInProgress = [...inProgress];
    const [movedTodo] = newInProgress.splice(index, 1);
    movedTodo.isComplete = true;
    setInProgress(newInProgress);
    setCompleted([...completed, movedTodo]);
    showFeedback("completed");
    toast.success("Task completed!", { position: "top-right" });

    // Verificação de conclusão total
    if (newInProgress.length === 0 && todos.length === 0) {
      toast.success("Congratulations! All tasks are completed!", {
        position: "top-right",
      });
    }
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
    toast.info("Task edited", { position: "top-right" });
  };

  const removeTodo = (list, setList, index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    toast.error("Task removed", { position: "top-right" });

    // Verificação de conclusão total ao remover
    if (list === inProgress && newList.length === 0 && todos.length === 0) {
      toast.success("Congratulations! All tasks are completed!", {
        position: "top-right",
      });
    }
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

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleCategoryFilterChange = (newCategoryFilter) => {
    setCategoryFilter(newCategoryFilter);
  };

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let sourceList, destinationList, setSourceList, setDestinationList;
    if (source.droppableId === "todos") {
      sourceList = todos;
      setSourceList = setTodos;
    } else if (source.droppableId === "inProgress") {
      sourceList = inProgress;
      setSourceList = setInProgress;
    } else {
      sourceList = completed;
      setSourceList = setCompleted;
    }

    if (destination.droppableId === "todos") {
      destinationList = todos;
      setDestinationList = setTodos;
    } else if (destination.droppableId === "inProgress") {
      destinationList = inProgress;
      setDestinationList = setInProgress;
    } else {
      destinationList = completed;
      setDestinationList = setCompleted;
    }

    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);

    setSourceList([...sourceList]);
    setDestinationList([...destinationList]);
  };

  const getFilteredTodos = (list) => {
    let filteredList = list;
    if (filter !== "all") {
      filteredList = filteredList.filter((todo) => {
        if (filter === "inProgress") return inProgress.includes(todo);
        if (filter === "completed") return completed.includes(todo);
        return true;
      });
    }
    if (categoryFilter !== "all") {
      filteredList = filteredList.filter(
        (todo) => todo.category === categoryFilter
      );
    }
    return filteredList;
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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div
        className={`${
          isDarkMode ? "dark" : ""
        } min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500 p-4`}
      >
        <div className="flex justify-end mb-4 w-full max-w-5xl">
          <button
            onClick={toggleDarkMode}
            className="text-2xl text-gray-900 dark:text-white transition-colors duration-500"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <div className="w-full max-w-5xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-colors duration-500">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-500 text-center">
            To-Do List
          </h1>
          <TodoForm addTodo={addTodo} />
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange("inProgress")}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                filter === "inProgress"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => handleFilterChange("completed")}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                filter === "completed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              }`}
            >
              Completed
            </button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <button
              onClick={() => handleCategoryFilterChange("all")}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                categoryFilter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => handleCategoryFilterChange("Work")}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                categoryFilter === "Work"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              }`}
            >
              Work
            </button>
            <button
              onClick={() => handleCategoryFilterChange("Personal")}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                categoryFilter === "Personal"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => handleCategoryFilterChange("Shopping")}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                categoryFilter === "Shopping"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              }`}
            >
              Shopping
            </button>
            <button
              onClick={() => handleCategoryFilterChange("Other")}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                categoryFilter === "Other"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              }`}
            >
              Other
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Droppable droppableId="todos">
              {(provided) => (
                <div
                  className="relative bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-lg"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    To Do
                  </h2>
                  <TodoList
                    todos={getFilteredTodos(todos)}
                    toggleComplete={moveToInProgress}
                    removeTodo={(index) => removeTodo(todos, setTodos, index)}
                    editTodo={editTodo}
                  />
                  {provided.placeholder}
                  {showTodoFeedback && (
                    <FaCheckCircle className="absolute top-0 right-0 text-green-500 text-2xl animate-bounce" />
                  )}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="inProgress">
              {(provided) => (
                <div
                  className="relative bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-lg"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    In Progress
                  </h2>
                  <TodoList
                    todos={getFilteredTodos(inProgress)}
                    toggleComplete={moveToCompleted}
                    removeTodo={(index) =>
                      removeTodo(inProgress, setInProgress, index)
                    }
                  />
                  {provided.placeholder}
                  {showInProgressFeedback && (
                    <FaCheckCircle className="absolute top-0 right-0 text-green-500 text-2xl animate-bounce" />
                  )}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="completed">
              {(provided) => (
                <div
                  className="relative bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-lg"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Completed
                  </h2>
                  <TodoList
                    todos={getFilteredTodos(completed)}
                    toggleComplete={() => {}}
                    removeTodo={(index) =>
                      removeTodo(completed, setCompleted, index)
                    }
                  />
                  {provided.placeholder}
                  {showCompletedFeedback && (
                    <FaCheckCircle className="absolute top-0 right-0 text-green-500 text-2xl animate-bounce" />
                  )}
                </div>
              )}
            </Droppable>
          </div>
        </div>
        <footer className="mt-8 text-center text-gray-700 dark:text-gray-300">
          <p>Made by Mateus Farias</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a
              href="https://www.linkedin.com/in/mateus-farias-b6ab77247/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a
              href="https://www.instagram.com/_fariasm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a
              href="https://github.com/O-Farias"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </div>
        </footer>
        <ToastContainer />
      </div>
    </DragDropContext>
  );
}

export default App;
