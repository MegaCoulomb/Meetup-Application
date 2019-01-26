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
      <button disabled={!index && true} onClick={() => props.pagination(-1)}>
        Previous
      </button>
      <div>{map}</div>
      <button
        disabled={!(index < length - 1) && true}
        onClick={() => props.pagination(1)}
      >
        Next
      </button>
    </Wrapper>
  );
};

export default index;

const Wrapper = styled.div`
  display: flex;
  width: 50vw;
  justify-content: space-around;
  align-items: center;

  div {
    display: flex;
    justify-content: space-around;
  }
`;

const Dot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: ${props => (props.index + 1 === props.e ? '#00A2C7' : '#000')};
  margin: 0 5px;
`;
