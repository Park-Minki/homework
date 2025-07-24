import React, { useState, useRef } from 'react';
import { BookProvider } from '../context/BookProvider';
import UserPage from '../components/UserPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/page.css';

function MainLayout() {
    const [selectName, setSelectName] = useState('kcs'); //사용자 선택 상태 , 기본값 kcs
    const [isLogIn, setIsLogIn] = useState(false); //로그인 상태
    const selectRef = useRef(null); //select에 접근하기 위한 객체

    //로그인 버튼 클릭 시 실행 함수
    const Login = () => {
        //select요소에서 선택된 값을 가져옴
        const selectedValue = selectRef.current.value;
        //선택된 사용자 이름 업데이트
        setSelectName(selectedValue);
        //로그인 상태를 true로 설정하여 UserPage 렌더링
        setIsLogIn(true);
    };
    //사용자 id와 실제 이름을 매핑
    const nameMap = {
        kcs: '김철수',
        kyh: '김영희',
    };

    return (
        <div className="container">
            <h2>도서 관리 시스템</h2>
            <div className='header'>
                {/*사용자 선택 박스*/}
                <select ref={selectRef} defaultValue={selectName}>
                    <option value="kcs">김철수</option>
                    <option value="kyh">김영희</option>
                </select>
                {/*로그인버튼*/}
                <button onClick={Login} className='btn btn-primary'>로그인</button>
                {/*로그인한 이름 출력*/}
                <header>{nameMap[selectName]}</header>
            </div>
            {/*로그인 후 렌더링*/}
            {isLogIn && (
                <BookProvider>
                    {/*선택된 사용자id를 전달*/}
                    <UserPage userId={selectName}/>
                </BookProvider>
            )}
        </div>
    );
}

export default MainLayout;
