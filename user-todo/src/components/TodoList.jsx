import React from 'react';
import TodoItem from './TodoItem';
import '../assets/css/todoList.css';

function TodoList({ todoList }) {
  return (
    <div className="todo-list">
        {todoList?.map((todo, index) => (
            <TodoItem key={index} todo={todo} />
        ))}
    </div>
  );
}

export default TodoList;
