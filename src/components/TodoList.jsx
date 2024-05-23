import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TodoItem from "./TodoItem";

function TodoList({ todos, toggleComplete, removeTodo, editTodo }) {
  return (
    <TransitionGroup component="ul">
      {todos.map((todo, index) => (
        <CSSTransition key={index} timeout={300} classNames="move">
          <TodoItem
            index={index}
            todo={todo}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
            editTodo={editTodo}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default TodoList;
