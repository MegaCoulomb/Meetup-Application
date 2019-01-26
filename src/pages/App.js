import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Event from '../components/event/index';
import Location from '../components/location/index';
import Nav from '../components/nav/nav';
import Reservation from '../components/reservation/index';

const urlOne =
  'https://cors-anywhere.herokuapp.com/https://api.meetup.com/reactjs-dallas/events';

const urlTwo = '?&sign=true&photo-host=public&key='

class App extends Component {
  state = {
    eventId: 'pbbdwnyzdbqb',
    events: [],
    index: 0,
    rsvp: [],
  };

  componentDidMount() {
    const {REACT_APP_API_KEY} = process.env
    this.getEvents(`${urlOne}${urlTwo}${REACT_APP_API_KEY}`, 'events');
    this.getEvents(`${urlOne}/${this.state.eventId}/rsvps${urlTwo}${REACT_APP_API_KEY}`, 'rsvp');
  }

  getEvents = async (url, state) => {
    (await fetch(url)).json().then(results => {
      this.setState({ [state]: results });
      if(state === 'events') {
        this.setState({eventId: this.state.events[this.state.index].id})
      }
    });
  };

  pagination = async num => {
    const {REACT_APP_API_KEY} = process.env
    await this.setState({ index: this.state.index + num }, () => this.setState({eventId: this.state.events[this.state.index].id}));
    await this.getEvents(`${urlOne}/${this.state.eventId}/rsvps${urlTwo}${REACT_APP_API_KEY}`, 'rsvp');
    await window.scroll({ top: 0, behavior: 'smooth' });
  }

  addRsvp = (img, name) => {
    const obj = {response: 'yes', member: {id: this.state.rsvp[0].member.id +1, name, photo: {highres_link: img}}}
    const newArr = [obj, ...this.state.rsvp]
    this.setState({rsvp: newArr})
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
              <Location addRsvp={this.addRsvp} event={events[index]} />
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
      padding-bottom: 8vh;
    `};
`;
