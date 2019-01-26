import React from 'react';
import styled, { keyframes } from 'styled-components';

const index = () => {
    let arr = ['first', 'second', 'third', 'fourth', 'fifth']
    let map = arr.map((e,i) => <div key={i} className={`bar ${e}`}/>)
    
    return (
        <Wrapper className="container">{map}</Wrapper>
    );
};

export default index;

const extend = keyframes`
   0% {
      transform: scale(1);
    }
    20% {
      transform: scale(1, 2.2);
      background-color: skyblue;
    }
    40% {
      transform: scale(1);
    }
`;


const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    border-radius: 4px;

    .bar {
    height: 20px;
    width: 4px;
    margin-right: 4px;
    border-radius: 4px;
    background-color: snow;
    animation: ${extend} 1s ease-in-out infinite;
  
  }
  
  .first { animation-delay: 0 }
  .second { animation-delay: 0.1s }
  .third { animation-delay: 0.2s }
  .fourth { animation-delay: 0.3s }
  .fifth { animation-delay: 0.4s }
`
  