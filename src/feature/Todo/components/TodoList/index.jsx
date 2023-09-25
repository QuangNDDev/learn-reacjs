// Cú pháp tạo mới component: rsfp
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./style.scss";

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
  totoList: [],
  onTodoClick: null,
};

function TodoList({ todoList, onTodoClick }) {
  const handleTodoClick = (todo, idx) => {
    if (!onTodoClick) return;
    onTodoClick(todo, idx);
  };
  return (
    <ul className="todo-list">
      {todoList.map((todo, idx) => (
        <li
          onClick={() => handleTodoClick(todo, idx)}
          key={todo.id}
          className={classnames({
            "todo-item": true,
            completed: todo.status === "completed",
          })}
        >
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
