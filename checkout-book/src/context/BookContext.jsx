import { createContext } from 'react';

//BookContext를 생성해 초기값을 null로 설정, 필요 시 Provider에서 실제 값을 설정
export const BookContext = createContext(null);
