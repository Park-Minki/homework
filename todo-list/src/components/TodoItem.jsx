import React from 'react';

// 할 일 단일 항목을 표시하는 컴포넌트
function TodoItem({ todo, toggleDone, toggleCheckbox, deleteTodo }) {
  return (
    <div className={`todo mb-2 ${todo.done ? 'complete' : ''}`}>
        {/* 체크박스 */}
      <div className="item1">
        <input type="checkbox" checked={todo.checked} disabled={todo.done} // 완료 시 체크 불가
          onChange={(e) => toggleCheckbox(todo.id, e.target.checked)}/>
      </div>
      {/* 텍스트 */}
      <div className="item2">
        <p style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</p>
      </div>
      {/* 완료/삭제 버튼 */}
      <div className="item3 text-end">
        <button className="btn btn-success me-2" disabled={todo.done} onClick={() => toggleDone(todo.id)}>완료</button>
        <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>삭제</button>
      </div>
    </div>
  );
}

export default TodoItem;
