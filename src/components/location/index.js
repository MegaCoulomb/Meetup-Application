import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styled, {css} from 'styled-components';
import {Btn} from '../pagination/index';

import Modal from '../modal/index';

class Location extends Component {
  state = {
    img: '',
    modal: false,
    rsvpName: ''
  }

  closeModal = e => e.target.id === 'modal' && this.setState({ modal: false })

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  keyDown = (e) => e.key === 'Enter' && this.join()

  join = () => {
    const {img, rsvpName} = this.state
    this.setState({modal: false}, () => this.props.addRsvp(img, rsvpName))
  }

  render(){
    const { lat, lon, name, address_1, address_2, city, state } = this.props.event.venue;
    const { date } = this.props;
    const center = {
      lat,
      lng: lon
    };

    return (
      <MapWrapper main>
        <h3 onClick={() => this.setState({modal: true})}>Join the waitlist!</h3>
        <Modal
          closeModal={this.closeModal}
          modal={this.state.modal}
        >
          <Container secondary>
            <h2>Complete your Reservation</h2>
            <Container>
              <Text>Profile Image</Text>
              <input autoFocus name="img" type="text" onChange={this.handleChange}/>
            </Container>
            <Container>
              <Text>Name</Text>
              <input 
                name="rsvpName"
                type="text"
                onChange={this.handleChange}
                onKeyDown={this.keyDown}
              />
            </Container>
            <Btn onClick={this.join}>
              Join Waitlist!
            </Btn>
          </Container>
        </Modal>
        <MapWrapper>
          <Container main >
            <Img main src='https://www.flaticon.com/premium-icon/icons/svg/519/519869.svg' alt='Clock' />
            <Container>
              <Text>{date}</Text>
              <Text>7:00 - 9:00</Text>
              <Text secondary>Every 2nd Tuesday of the Month</Text>
            </Container>
          </Container>
          <Container main>
            <Img main src='https://image.flaticon.com/icons/svg/67/67347.svg' alt='Map Marker' />
            <Container>
              <Text>{name}</Text>
              <Text secondary>{address_1} {address_2}</Text>
              <Text secondary>{city}, {state.toUpperCase()}</Text>
            </Container>
          </Container>
          <GoogleMapReact center={center} defaultZoom={11}>
            <Marker lat={lat} lng={lon} />
          </GoogleMapReact>
        </MapWrapper>
      </MapWrapper>
    );
  }
}

export default Location;

const Marker = () => <Img src="https://image.flaticon.com/icons/svg/149/149059.svg" alt="Marker" />

const MapWrapper = styled.div`
  position: sticky;
  top: 3vh;
  width: 25vw;
  height: 40vh;
  background: ${props => !props.main && '#fff'};

  ${props => props.main && css`
    margin: 5vh 0 0 3vh;
    padding-bottom: 2vh;
    border-radius: 10px;  
  `};

  h3 {
    text-align: center;
    margin: 1vh 0;
    border-radius: 10px;
    background: #e8e8e8;
    padding: 1vh 1vw;
    margin-top: 0;
    cursor: pointer;
  }

  h3:hover{
    color: #00A2C7;
  }

  h3:active{
    transform: scale(.98);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: ${props => !(props.main) && 'column'};
  margin: ${props => !(props.main) && '2vh 0'};
  align-items: ${props => props.main && 'center'};

  h2 {
    color: #00A2C7;
  }

  ${props => props.secondary && css`
    height: 60%;
    justify-content: space-around;
  `}
`

const Img = styled.img`
  height: 30px;
  width: 30px;
  margin: ${props => props.main && '0 2vw'};
`

const Text = styled.p`
  color: ${props => props.secondary && '#ACB3B7'};
  margin: .25em 0;
  text-indent: 10px;
`
