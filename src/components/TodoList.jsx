import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TodoItem from "./TodoItem";
import { Draggable } from "react-beautiful-dnd";

function TodoList({ todos, toggleComplete, removeTodo, editTodo }) {
  return (
    <TransitionGroup component="ul" className="space-y-2">
      {todos.map((todo, index) => (
        <CSSTransition key={index} timeout={300} classNames="move">
          <Draggable key={todo.text} draggableId={todo.text} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TodoItem
                  index={index}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  removeTodo={removeTodo}
                  editTodo={editTodo}
                />
              </div>
            )}
          </Draggable>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default TodoList;
