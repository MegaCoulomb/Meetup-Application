import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';

import Event from '../components/event/index';
import Footer from '../components/footer/index';
import Loading from '../components/loading/index';
import Location from '../components/location/index';
import Nav from '../components/nav/index';
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
    await window.scroll({ top: 0, behavior: 'smooth' });
    await this.getEvents(`${urlOne}/${this.state.eventId}/rsvps${urlTwo}${REACT_APP_API_KEY}`, 'rsvp');
  }

  addRsvp = (img, name) => {
    const obj = {
      response: 'yes', 
      member: {
        id: this.state.rsvp[0].member.id +1, 
        name, 
        photo: 
          { photo_link: img.includes('http') 
            ? img 
            : 'https://stock.wikimini.org/w/images/9/95/Gnome-stock_person-avatar-profile.png', 
            type: 'member'}
          }
        }
    const newArr = [obj, ...this.state.rsvp]
    this.setState({rsvp: newArr})
  }

  render() {
    const { events, rsvp, index } = this.state;
    const date = moment(!!events.length && events[index].local_date, 'YYYY-M-D').format('dddd, MMMM D, YYYY')

    return (
      <>
        <Nav />
        {!!events.length ? (
          <Wrapper main>
            <Container>
                <h2>{events[index].name}</h2>
                <p>{date}</p>
            </Container>
            <Wrapper>
              <Event index={index} length={events.length} event={events[index]} pagination={this.pagination}/>
              <Location date={date} addRsvp={this.addRsvp} event={events[index]} />
            </Wrapper>
            <Wrapper secondary>
              <Reservation rsvp={rsvp} />
            </Wrapper>
          </Wrapper>
        )
          : 
          <Loading />
      }
        <Footer />
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

const Container = styled.div`
  width: 50vw;
  border-radius: 10px;
  background: #e8e8e8;
  margin: 3vh 0;
  padding: 1vh 1vw;
  position: sticky;
  top: 3vh;
`