import React, { Component } from 'react';
import styled from 'styled-components';

import Modal from '../modal/index';

class Reservation extends Component {
  state = {
    modal: false,
    rsvp: this.props.rsvp
  };

  static getDerivedStateFromProps(props, state) {
    if (props !== state) {
      return {
        rsvp: props.rsvp
      }
    }
    return null;
  }

  closeModal = e => e.target.id === 'modal' && this.setState({ modal: false })

  map = val => {
    return val.map(e => {
      const { id, name, photo } = e.member;
      return (
        <Cont key={id}>
          <img
            src={
             (photo && photo.highres_link) ||
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
    const { rsvp } = this.state;

    const filter = rsvp.filter(e => e.response === 'yes').sort((a,b) => a.created - b.created)
    return (
      <Wrapper main>
      <Section>
        <h2>Attendees({filter.length})</h2>
        <p onClick={() => this.setState({ modal: true })}>Show all</p>
      </Section>
      <Section>
        <h4>{rsvp.length-filter.length} on waitlist</h4>
      </Section>
        <Wrapper>{this.map(filter.slice(0, 9))}</Wrapper>
        <Modal
          closeModal={this.closeModal}
          modal={this.state.modal}
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
    object-fit: cover;
  }

  p:nth-of-type(1) {
    font-weight: 600;
  }
`;
