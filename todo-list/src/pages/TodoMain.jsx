import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/todolist.css';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';

function TodoMain() {
  //todos 배열에 각 할 일 객체 저장
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(); // input 입력값 접근용

  // 새 할 일 추가 함수
  const createTodo = () => {
    const value = inputRef.current.value.trim(); //입력값 정리
    if (value.length === 0) {
      alert('할일을 입력하십시오');
      inputRef.current.focus();
      return;
    }
    // 새로운 todo 객체 추가
    setTodos([
      ...todos,
      { id: Date.now(), text: value, done: false, checked: false }
    ]);
    inputRef.current.value = ''; // 입력창 초기화
  };

  // 단일 항목 완료 처리
  const toggleDone = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: true, checked: true } : todo
    ));
  };

  // 체크박스 상태 변경
  const toggleCheckbox = (id, checked) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, checked } : todo
    ));
  };

  //삭제 기능
  const deleteTodo = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // 체크된 항목 일괄 완료 처리
  const allCheckTodo = () => {
    const toBeCompleted = todos.filter(todo => !todo.done && todo.checked);
    if (toBeCompleted.length === 0) {
      alert('일괄처리할 일들을 선택하세요');
      return;
    }

    // 일괄적으로 완료 처리
    setTodos(todos.map(todo =>
      todo.checked && !todo.done ? { ...todo, done: true } : todo
    ));
  };

  //상태 통계 계산
  const doneCount = todos.filter(todo => todo.done).length;
  const todoCount = todos.length - doneCount;
  const donePercent = todos.length === 0 ? 0 : ((doneCount / todos.length) * 100).toFixed(2);

  return (
    <main className="container">
      <section className="contents">
        <header className="header mb-3">
          <p>TodoList</p>
        </header>
        {/* 상태 통계 */}
        <section className="work-status mb-3 text-end">
          <p>할 일 : <span>{todoCount}</span>건</p>
          <p>한 일 : <span>{doneCount}</span>건</p>
          <p>달성률 : <span>{parseFloat(donePercent)}</span>%</p>
        </section>
        {/* 입력 폼 및 버튼들 */}
        <TodoInput inputRef={inputRef} createTodo={createTodo} allCheckTodo={allCheckTodo} />
        {/* 할 일 목록 */}
        <TodoList todos={todos} toggleDone={toggleDone}
        toggleCheckbox={toggleCheckbox} deleteTodo={deleteTodo}/>
      </section>
    </main>
  );
}

export default TodoMain;
