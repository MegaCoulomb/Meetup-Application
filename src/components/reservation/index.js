import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Modal from '../modal/index';

class Reservation extends Component {
  state = {
    id: 'attending',
    modal: false,
    rsvp: this.props.rsvp,
    toggle: false
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

  toggle = e => {
    const { id } = e.target
    document.getElementById(this.state.id).style.borderBottom = 'none'
      document.getElementById(id).style.borderBottom = '1px solid #00A2C7'
    e.target.innerText === 'Attending' 
      ? this.setState({toggle: false, id})
      : this.setState({toggle: true, id})
  }

  map = val => {
    return val.map(e => {
      const { id, name, photo } = e.member;
      return (
        <Cont key={id}>
          <img
            src={
             (!!photo && photo.photo_link) ||
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
    const { rsvp, toggle } = this.state;

    const filter = rsvp.filter(e => e.response === 'yes').sort((a,b) => a.created - b.created)
    const waitlist = rsvp.filter(e => e.response === 'waitlist').sort((a,b) => a.created - b.created)
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
          height='80vh'
          width='80vw'
        >
          <Text id='attending' onClick={this.toggle}>Attending</Text>
          <Text id='waitlist' onClick={this.toggle}>Waitlist</Text>
          <Text main>({(toggle ? waitlist.length : filter.length)})</Text>
          <Wrapper>
            {this.map(toggle ? waitlist : filter)}
          </Wrapper>
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
  flex-direction: ${props => props.secondary && 'column'};

  ${props => props.main && css`
    @media (max-width: 1100px) {
        width: 80vw;
      }
  `};
`;

const Text = styled.p`
  margin: 1em;
  cursor: pointer;
  font-weight: ${props => props.main && '600'};
  margin-left: ${props => props.main && '3em'};

  &#attending {
    border-bottom: 1px solid #00A2C7;
  }
  
`

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  p {
    cursor: pointer;
  }

  h4 {
    font-weight: 300;
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

  @media (max-width: 1100px) {
    width: 20vw;
    margin: 2%;
      }
`;
