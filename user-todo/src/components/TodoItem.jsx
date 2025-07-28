import React, { useContext } from 'react';
import {TodoContext} from '../context/TodoContext';
import '../assets/css/todoItem.css';

function TodoItem({todo}) {
    const {updateChecked, doneTodoBtn, delTodoBtn} = useContext(TodoContext);
    
    return (
        <div className={`todo-item ${todo.isDone ? 'done' : ''}`}>
            <div className="todo-checkbox">
                <input type="checkbox" checked={todo.checked} onChange={() => updateChecked(todo.id)}/>
            </div>
            <div className="todo-content" style={{textDecoration: todo.isDone ? 'line-through' : 'none'}}>
                {todo.contents}
            </div>
            <div className="todo-buttons">
                <button type="button" className="btn btn-primary mx-1" disabled={todo.isDone}
                onClick={() => doneTodoBtn(todo.id)}>완료</button>
                <button type="button" className="btn btn-danger"
                onClick={() => delTodoBtn(todo.id)}>삭제</button>
            </div>
        </div>
    );
}

export default TodoItem;