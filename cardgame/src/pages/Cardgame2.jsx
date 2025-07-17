import React, { useReducer } from 'react';
import '../assets/css/cards.css';
import Card from '../components/card';

//set을 이용해 1~20의 숫자를 중복없이 5장 생성
const getRandomCards = () => {
    const set = new Set();
    while (set.size < 5) {
        const rand = Math.floor(Math.random() * 20) + 1;
        set.add(rand);
    }
    return Array.from(set);
};

function Cardgame2(props) {
    //게임상태초기값설정
    const initialState = {
        playerCards: [], //사용자카드
        pcCards: [], //pc카드
        selected: [], //사용자 선택카드
        result: '', //결과
        gameStarted: false //게임 시작 여부
    };
    //상태 업데이트를 담당하는 reducer
    const gameReducer = (state, action) => {
        switch (action.type) {
            case 'start': {
                //시작상태라면 아무것도 하지 않음
                if (state.gameStarted) return state;
                return { //사용자와 pc의 카드를 랜덤으로 설정하고 시작
                    ...state, playerCards: getRandomCards(), pcCards: getRandomCards(),
                    selected: [], result: '', gameStarted: true
                };
            }
            case 'select': {
                const { index } = action;
                //게임시작하지않으면 카드 선택 불가
                if (!state.gameStarted) {
                    return state;
                }
                const isSelected = state.selected.includes(index);
                //이미 선택된 카드라면 제거 아니라면 추가
                let newSelected = isSelected
                    ? state.selected.filter(i => i !== index)
                    : [...state.selected, index];
                // 선택된 카드가 2장을 초과하면 상태 변경하지 않음
                if (newSelected.length > 2) {
                    return state;
                }
                return {
                    ...state, selected: newSelected
                };
            }
            case 'choice': {
                // 선택된 카드가 2장이 아닐 경우 결과 계산 불가
                if (state.selected.length !== 2) {
                    return state;
                }
                //사용자가 선택한 카드의 합
                const playerSum = state.selected
                    .map(i => state.playerCards[i]).reduce((a, b) => a + b, 0);
                // PC카드 중 랜덤 2장 선택
                const indices = new Set();
                while (indices.size < 2) {
                    indices.add(Math.floor(Math.random() * state.pcCards.length));
                }
                const pcChoices = Array.from(indices).map(i => state.pcCards[i]);
                //pc 선택 카드 합
                const pcSum = pcChoices.reduce((a, b) => a + b, 0);

                let result = '';
                //결과 판별하기
                if (playerSum > pcSum) {
                    result = `승리 USER(${playerSum}) > PC(${pcSum})`;
                } else if (playerSum < pcSum) {
                    result = `패배 USER(${playerSum}) < PC(${pcSum})`;
                } else {
                    result = `무승부 USER(${playerSum}) = PC(${pcSum})`;
                }
                //게임 종료
                return {
                    ...state, result, gameStarted: false
                };
            }
            //리셋
            case 'reset': {
                return initialState;
            }
            default: {
                return state;
            }
        }
    };
    // useReducer 훅을 통해 상태와 디스패치 함수 사용
    const [state, dispatch] = useReducer(gameReducer, initialState);
    // 카드 선택 시 호출되는 핸들러
    const handleCardSelect = (index) => {
        dispatch({ type: 'select', index });
    };

    return (
        <div>
            <main className='container'>
                <section className='contents'>
                    {   //사용자카드 랜더링 , input > 체크박스 상태와 시작전 숨김처리
                        state.playerCards.map((cardNum, index) => (
                            <Card key={index}>
                                <label> 
                                    <input type='checkbox' checked={state.selected.includes(index)}
                                    onChange={() => handleCardSelect(index)} disabled={!state.gameStarted}/>
                                    <p>{cardNum}</p>
                                </label>
                            </Card>
                        ))
                    }
                </section>
                <section className='btn-box'>
                    <button type='button' className='btn' onClick={() => dispatch({ type:'start'})}>시작</button>
                    <button type='button' className='btn' onClick={() => dispatch({ type:'choice'})}>선택</button>
                    <button type='button' className='btn' onClick={() => dispatch({ type:'reset'})}>리셋</button>
                </section>
                {state.result && (
                    <section className='result'>
                        <h3>{state.result}</h3>
                    </section>
                )}
            </main>
        </div>
    );
}

export default Cardgame2;
