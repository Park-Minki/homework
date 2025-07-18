import React from 'react';

// 입력창과 등록/일괄완료 버튼 담당 컴포넌트
function TodoInput({ inputRef, createTodo, allCheckTodo }) {
  return (
    <section className="todo-input mb-4">
      <div className="row">
        {/* 입력 필드 */}
        <div className="col-8">
          <input type="text" className="form-control" ref={inputRef} />
        </div>
        {/* 버튼 영역 */}
        <div className="col-4 text-end">
          <button className="btn btn-primary me-2" onClick={createTodo}>등록</button>
          <button className="btn btn-success" onClick={allCheckTodo}>일괄 완료</button>
        </div>
      </div>
    </section>
  );
}

export default TodoInput;
