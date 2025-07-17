import React, { Children } from 'react';
import {styled} from 'styled-components'

const MyCard = styled.div`
    width: 120px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 7px;
    background-color: #efaaef;
`
function Card({children}) {
    return (
        <>
            <MyCard>
                <p>{children}</p>
            </MyCard>
        </>
    );
}

export default Card;