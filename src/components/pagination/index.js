import React from 'react';
import styled from 'styled-components';

const index = props => {
  const { index, length } = props;

  const arr = [];
  for (let i = 1; i <= length; i++) {
    arr.push(i);
  }

  const map = arr.map(e => <Dot e={e} index={index} key={e} />);
  return (
    <Wrapper>
      <Btn disabled={!index && true} onClick={() => props.pagination(-1)}>
        Previous
      </Btn>
      <div>{map}</div>
      <Btn
        disabled={!(index < length - 1) && true}
        onClick={() => props.pagination(1)}
      >
        Next
      </Btn>
    </Wrapper>
  );
};

export default index;

const Wrapper = styled.div`
  display: flex;
  width: 50vw;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 3vh;
  border-bottom: 2px solid rgba(225, 225, 225, .8);

  div {
    display: flex;
    justify-content: space-around;
  }
`;

export const Btn = styled.button`
  border-color: rgba(225, 225, 225, .8);
  padding: .5em 1em;

  &:hover {
    background: ${props => !props.disabled && '#F6F7F8'};
    cursor: pointer;
  }
`

const Dot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: ${props => (props.index + 1 === props.e ? '#00A2C7' : '#000')};
  margin: 0 5px;
`;
