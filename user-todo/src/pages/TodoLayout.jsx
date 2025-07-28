import React, { useEffect, useRef, useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/todolayout.css';
import { TodoContext } from '../context/TodoContext';
import InputEditor from '../components/InputEditor';
import Todo from '../components/Todo';
import TodoList from '../components/TodoList';
import AllCheckButton from '../components/AllCheckButton';
import TodoLogin from '../components/TodoLogin';

function TodoLayout() {
    const [inputText, setInputText] = useState('');
    const [userId, setUserId] = useState('');
    const [userTodos, setUserTodos] = useState({kcs: [], kyh: []});

    const [todoCount, setTodoCount] = useState(0);
    const [doneCount, setDoneCount] = useState(0);
    const [doneRate, setDoneRate] = useState(0);

    const todoId = useRef(1);
    const isDisabled = !userId;

    const todoList = useMemo(() => {
        return userTodos?.[userId] ?? []; //userTodos객체가 존재하면 userId값을 가져오고 없다면 빈 배열
    }, [userTodos, userId]);

    const handleLogin = (user) =>
        setUserId(user);

    const handleLogout = () =>
        setUserId('');

    const createTodo = () => {
        const todo = new Todo(todoId.current++, inputText, false, false);
        //기존 상태를 전개 연산자로 복사하고 로그인된 사용자에 새 배열을 넣고, 값이 있으면 전개. 없다면 빈 배열
        setUserTodos(prev => ({...prev, [userId]: [...(prev[userId] || []), todo]}));
        setInputText('');
    };

    const updateChecked = (id) => {
        //현재 로그인된 사용자의 리스트만 업데이트하고 일치하는 항목의 체크값을 토글
        setUserTodos(prev => ({...prev,[userId]: prev[userId].map(todo =>
                todo.id === id ? { ...todo, checked: !todo.checked } : todo
            )
        }));
    };

    const doneTodoBtn = (id) => {
        //id가 같은 todo항목의 isDone속성을 true로 변경
        setUserTodos(prev => ({...prev, [userId]: prev[userId].map(todo =>
                todo.id === id ? { ...todo, isDone: true } : todo
            )
        }));
    };

    const delTodoBtn = (id) => {
        if (confirm('삭제하시겠습니까?')) {
            //id와 일치하지 않는 todo들만 남김
            setUserTodos(prev => ({...prev, [userId]: prev[userId].filter(todo => todo.id !== id)}));
        }
    };

    const allDoneTodo = () => {
        const targetTodos = todoList.filter(todo => todo.checked && !todo.isDone);
        if (targetTodos.length === 0) {
            alert('일괄 처리할 일을 체크하세요.');
            return;
        }
        //checked가 true인 todo항목들의 isDone속성을 true로 변경
        setUserTodos(prev => ({...prev, [userId]: prev[userId].map(todo =>
                todo.checked ? { ...todo, isDone: true } : todo
            )
        }));
    };

    const allDelTodo = () => {
        const checkedTodos = todoList.filter(todo => todo.checked);
        if (checkedTodos.length === 0) {
            alert('일괄 삭제할 일을 체크하세요.');
            return;
        }
        if (confirm('삭제하시겠습니까?')) {
            //checked가 false인 todo만 남김
            setUserTodos(prev => ({...prev, [userId]: prev[userId].filter(todo => !todo.checked)}));
        }
    };

    useEffect(() => {
        const totalSize = todoList.length;
        const done = todoList.filter(todo => todo.isDone).length;
        const todo = totalSize - done;
        const rate = totalSize === 0 ? 0 : parseFloat(((done / totalSize) * 100).toFixed(2));

        setDoneCount(done);
        setTodoCount(todo);
        setDoneRate(rate);
    }, [todoList]);

    return (
        <main className="container mt-4">
            <TodoContext.Provider value={{updateChecked, doneTodoBtn, delTodoBtn}}>
                <section className="contents mt-3">
                    <section className="text-end mb-2">
                        <h1 className="text-center">Todo List</h1>
                        <TodoLogin onLogin={handleLogin} onLogout={handleLogout} userId={userId}/>
                        <p>할 일 : {todoCount} 건</p>
                        <p>한 일 : {doneCount} 건</p>
                        <p>달성률 : {doneRate} %</p>
                    </section>
                    <InputEditor inputText={inputText} setInputText={setInputText}
                    createTodo={createTodo} disabled={isDisabled}/>
                    <AllCheckButton allDoneTodo={allDoneTodo} allDelTodo={allDelTodo}
                    disabled={isDisabled}/>
                    <TodoList todoList={todoList}/>
                </section>
            </TodoContext.Provider>
        </main>
    );
}

export default TodoLayout;
