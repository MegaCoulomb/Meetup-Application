import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import moment from 'moment';
import styled, {css} from 'styled-components';

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
    const { event } = this.props;
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
          <Container>
            <h2>Complete your Reservation</h2>
            <input name="img" type="text" onChange={this.handleChange}/>
            <input 
              name="rsvpName"
              type="text"
              onChange={this.handleChange}
              onKeyDown={this.keyDown}
            />
            <button onClick={this.join}>
              Join Waitlist!
            </button>
          </Container>
        </Modal>
        <MapWrapper>
          <Container>
            <Text>{moment(event.local_date).format('dddd, MMMM D, YYYY')}</Text>
            <Text>{moment(+event.local_time).format('LT')}</Text>
            <Text secondary>Every 2nd Tuesday of the Month</Text>
            <Text third>Add to Calendar</Text>
          </Container>
          <Container>
            <Text>{name}</Text>
            <Text secondary>{address_1} {address_2}</Text>
            <Text secondary>{city}, {state.toUpperCase()}</Text>
          </Container>
          <GoogleMapReact defaultCenter={center} defaultZoom={11}>
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
  top: 0;
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
    cursor: pointer;
  }

  h3:hover{
    color: #00A2C7;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    color: #00A2C7;
  }
`

const Img = styled.img`
  height: 30px;
  width: 30px;
`;

const Text = styled.p`
  color: ${props => props.secondary && '#ACB3B7'};
  margin: .25em 0;
  text-indent: 10px;
`
