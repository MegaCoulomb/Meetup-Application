import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Event from '../components/event/index';
import Location from '../components/location/index';
import Nav from '../components/nav/nav';
import Reservation from '../components/reservation/index';

const baseUrl =
  'https://cors-anywhere.herokuapp.com/https://api.meetup.com/reactjs-dallas/events';

class App extends Component {
  state = {
    events: [],
    rsvp: [],
    index: 0,
    url: `${baseUrl}?&sign=true&photo-host=public&key=${
      process.env.REACT_APP_API_KEY
    }`,
    reservation: `${baseUrl}/pbbdwnyzdbqb/rsvps?&sign=true&photo-host=public&key=${
      process.env.REACT_APP_API_KEY
    }`
  };
  componentDidMount() {
    this.getEvents(this.state.url, 'events');
    this.getEvents(this.state.reservation, 'rsvp');
  }

  getEvents = async (url, state) => {
    (await fetch(url)).json().then(results => {
      this.setState({ [state]: results });
    });
  };

  pagination = num => {
    this.setState({ index: this.state.index + num });
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  render() {
    const { events, rsvp, index } = this.state;

    return (
      <>
        <Nav />
        {!!events.length && (
          <Wrapper main>
            <Wrapper>
              <Event index={index} length={events.length} event={events[index]} pagination={this.pagination}/>
              <Location event={events[index]} />
            </Wrapper>
            <Wrapper secondary>
              <Reservation rsvp={rsvp} />
            </Wrapper>
          </Wrapper>
        )}
      </>
    );
  }
}

export default App;

const Wrapper = styled.div`
  display: flex;
  justify-content: ${props => (props.secondary ? 'flex-start' : 'center')};

  ${props =>
    props.main &&
    css`
      width: 80vw;
      justify-content: center;
      margin: auto;
      flex-direction: column;
    `};
`;
