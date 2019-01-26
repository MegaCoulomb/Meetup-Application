import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Event from '../components/event/index';
import Location from '../components/location/index';
import Nav from '../components/nav/nav';
import Pagination from '../components/pagination/index';
import Reservation from '../components/reservation/index';
import '../App.css';

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

  pagination = num => this.setState({ index: this.state.index + num });

  render() {
    const { events, rsvp, index } = this.state;

    console.log(window.innerHeight)
    return (
      <>
        <Nav />
        {!!events.length && (
          <Wrapper main>
            <Wrapper>
              <Event event={events[index]} />
              <Location event={events[index]} />
            </Wrapper>
            <Pagination
              index={index}
              length={events.length}
              pagination={this.pagination}
            />
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
