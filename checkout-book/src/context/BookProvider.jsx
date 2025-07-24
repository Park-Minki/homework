import React, { useState } from 'react';
import { BookContext } from './BookContext';

//자식 컴포넌트에 books를 context를 통해 제공
export function BookProvider({children}) {
  //도서 상태를 관리하는 useState
  //books객체는 전체 도서 목록과 각 사용자별 대여 목록을 포함
  const [books, setBooks] = useState({
    all: [
      { id: 1, title: '자바스크립트' },
      { id: 2, title: '리액트' },
      { id: 3, title: '자바' },
      { id: 4, title: 'java' },
      { id: 5, title: 'react' },
      { id: 6, title: 'script' },
    ],
    //사용자별 대여 목록
    rented: {
      kcs: [],
      kyh: []
    }
  });

  return (
    //books 상태와 setBooks 함수를 하위 컴포넌트에 제공
    <BookContext.Provider value={{books, setBooks}}>
      {children}
    </BookContext.Provider>
  );
}
