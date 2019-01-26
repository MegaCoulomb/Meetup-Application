import React from 'react';
import styled, {css} from 'styled-components';

const modal = ({ closeModal, modal, children }) => {
  console.log(children);
  return (
    modal && (
      <Container id="modal" onClick={closeModal}>
        <Sub>
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
  justify-content: center;
  align-items: center;
  background: white;
  width: 80vw;
  height: 80vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: scroll;
flex-wrap: wrap;
background: #F6F7F8;


${props =>
    props.secondary &&
    css`
      display: flex;
      flex-wrap: wrap;
      height: inherit;
    `};
`;
