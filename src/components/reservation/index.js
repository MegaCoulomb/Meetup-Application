import React, { Component } from 'react';
import styled from 'styled-components';

import Modal from '../modal/index';

class Reservation extends Component {
  state = {
    modal: false
  };

  closeModal = e => {
    e.target.id === 'modal' && this.setState({ modal: false });
  };

  map = val => {
    return val.map(e => {
      const { id, name, photo } = e.member;
      return (
        <Cont key={id}>
          <img
            src={
              photo && photo.highres_link ||
              'https://stock.wikimini.org/w/images/9/95/Gnome-stock_person-avatar-profile.png'
            }
            alt="Attendee avatar"
          />
          <p>{name}</p>
          <p>{photo && photo.type}</p>
        </Cont>
      );
    });
  };

  render() {
    const { rsvp } = this.props;
    return (
      <Wrapper main>
      <Section>

        <h2>Attendees({rsvp.length})</h2>
        <p onClick={() => this.setState({ modal: true })}>Show all</p>
      </Section>
        <Wrapper>{this.map(rsvp.slice(0, 9))}</Wrapper>
        <Modal
          closeModal={this.closeModal}
          modal={this.state.modal}
          rsvp={rsvp}
        >
          {this.map(rsvp)}
        </Modal>
      </Wrapper>
    );
  }
}

export default Reservation;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  width: ${props => props.main && '50vw'};
  margin-top: ${props => props.main && '5vh'};
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  p {
    cursor: pointer;
  }
`

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 10vw;
  height: 30vh;
  background: #fff;
  border-radius: 10px;
  margin: 1%;
  text-align: center;

  img {
    height: 5em;
    width: 5em;
    border-radius: 50%;
  }

  p:nth-of-type(1) {
    font-weight: 600;
  }
`;
