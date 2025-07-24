import React, { useContext, useState } from 'react';
import { BookContext } from '../context/BookContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/page.css';

function UserPage({userId}) {
    //Context에서 books와 setBooks를 가져옴
    const { books, setBooks } = useContext(BookContext);
    //체크된 도서id를 저장
    const [selectedIds, setSelectedIds] = useState([]);
    //추가할 도서 상태
    const [newTitle, setNewTitle] = useState('');
    //현재 대여한 책id배열
    const myBooks = books.rented[userId];
    //전체 도서 목록
    const allBooks = books.all;
    //대여가능도서 목록
    const availableBooks = allBooks.filter(book =>
        !Object.values(books.rented).some(ids => ids.includes(book.id))
    );
    //체크박스 클릭 선택/해제
    const toggleSelect = (id) => {
        setSelectedIds(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };
    //도서 추가
    const handleAdd = () => {
        if (!newTitle.trim()) return; //빈 문자열 방지
        const newBook = { id: Date.now(), title: newTitle }; //고유 id생성
        setBooks(prev => ({...prev, all: [...prev.all, newBook] //기존 목록에 새 도서 추가
        }));
        setNewTitle(''); //입력 초기화
    };
    //대여
    const handleRent = () => {
        setBooks(prev => ({...prev, rented: {...prev.rented,
            [userId]: [...prev.rented[userId], ...selectedIds]} //기존 목록에 추가
        }));
        setSelectedIds([]); //선택 초기화
    };
    //반납
    const handleReturn = () => {
        setBooks(prev => ({...prev, rented: {...prev.rented,
            [userId]: prev.rented[userId].filter(id => !selectedIds.includes(id))
        }
        }));
        setSelectedIds([]);
    };
    //삭제
    const handleDelete = () => {
        setBooks(prev => {
        const newAll = prev.all.filter(book => !selectedIds.includes(book.id));
        const newRented = Object.fromEntries(
            Object.entries(prev.rented).map(([uid, ids]) => 
            [uid, ids.filter(id => !selectedIds.includes(id)),]) //삭제 도서 제거
        );
        return {
            all: newAll,
            rented: newRented
        };
        });
        setSelectedIds([]);
    };

    return (
    <div className="user-page">
            <p>내가 대여한 도서</p>
        <div className='item-1'>
            <button onClick={handleReturn} className='btn btn-success'
            disabled={selectedIds.length === 0}>반납</button>
        </div>
        {/*대여한 도서 목록, 체크박스*/}
        <div className="checkList">
            {allBooks
                .filter(book => myBooks.includes(book.id))
                .map(book => (
                    <label key={book.id} className='contents'>
                        <input type="checkbox" checked={selectedIds.includes(book.id)}
                        onChange={() => toggleSelect(book.id)}/>
                        {book.title}
                    </label>
                ))}
        </div>
            <p>대여 가능한 도서 목록</p>
        <div className='item-2'>
            {/*새 도서 제목 입력*/}
            <input type="text" value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)}/>
            <button onClick={handleAdd} className='btn btn-primary'>추가</button>
            <button onClick={handleRent} className='btn btn-success'
            disabled={selectedIds.length === 0}>대여</button>
            <button onClick={handleDelete} className='btn btn-danger'
            disabled={selectedIds.length === 0}>삭제</button>
        </div>
        {/*전체 도서 목록, 체크박스에 대여된 책 선택 불가 기능*/}
        <div className="bookList">
            {allBooks.map(book => {
                const isRented = Object.values(books.rented).some(ids => ids.includes(book.id));
                const isAvailable = !isRented;
                return (
                    <label key={book.id} className='contents'>
                    <input type="checkbox" checked={selectedIds.includes(book.id)}
                    onChange={() => toggleSelect(book.id)} disabled={!isAvailable}/>
                    {book.title} {isRented ? '(대여중)' : ''}
                    </label>
                );
            })}
        </div>
    </div>
  );
}

export default UserPage;
