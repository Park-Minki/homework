import React, { useState } from 'react';

function TodoLogin({ onLogin, onLogout, userId }) {
    const [selectedUser, setSelectedUser] = useState('');

    const handleLogin = () => {
        onLogin(selectedUser);
    };

    const handleLogout = () => {
        setSelectedUser(''); //로그아웃 시, 셀렉트 박스의 빈 옵션으로 이동
        onLogout();
    };

    const nameMap = {
        kcs: '김철수',
        kyh: '김영희',
    };

    return (
        <div className="login-box">
            <select className="form-select w-auto" value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)} disabled={userId}>
                <option value=""></option>
                <option value="kcs">김철수</option>
                <option value="kyh">김영희</option>
            </select>
            {!userId ? (
                <button onClick={handleLogin} className="btn btn-primary">로그인</button>
            ) : (
                <>
                    <button onClick={handleLogout} className="btn btn-danger">로그아웃</button>
                    <span>{nameMap[userId]}</span>
                </>
            )}
        </div>
    );
}

export default TodoLogin;
