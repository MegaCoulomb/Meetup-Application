import React from 'react';
import styled, { css } from 'styled-components';

const modal = ({ closeModal, modal, height, width, children }) => {
// console.log(props)
  return (
    modal && (
      <Container id="modal" onClick={closeModal}>
        <Sub height={height} width={width}>
          <Sub secondary>{children}</Sub>
        </Sub>
      </Container>
    )
  );
};

export default modal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(154, 154, 154, 0.4);
  z-index: 10;
`;

const Sub = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
  height: ${props => props.height || "50vh"};
  width: ${props => props.width || "50vw"};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: scroll;
  flex-wrap: wrap;
  background: #f6f7f8;
  padding: 5vh 0;

  ${props =>
    props.secondary &&
    css`
      display: flex;
      flex-wrap: wrap;
      height: inherit;
    `};
`;
