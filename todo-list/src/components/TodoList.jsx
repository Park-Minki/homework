import React from 'react';
import TodoItem from './TodoItem';

// 할 일 목록 전체를 렌더링하는 컴포넌트
function TodoList({ todos, toggleDone, toggleCheckbox, deleteTodo }) {
  return (
    <section className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleDone={toggleDone}
        toggleCheckbox={toggleCheckbox} deleteTodo={deleteTodo}/>
      ))}
    </section>
  );
}

export default TodoList;
