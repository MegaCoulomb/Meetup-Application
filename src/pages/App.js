import React, { Component } from 'react';

import Event from '../components/Event/index';
import Nav from '../pages/nav';
import Pagenation from '../components/Pagenation/index';
import '../App.css';

const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.meetup.com/reactjs-dallas/events'

class App extends Component {
  state = {
    event: [],
    index: 0,
    url: `${baseUrl}?&sign=true&photo-host=public&key=${process.env.REACT_APP_API_KEY}`,
    rsvp: `${baseUrl}/pbbdwnyzdbqb/rsvps?&sign=true&photo-host=public&key=${process.env.REACT_APP_API_KEY}`
  }
  componentDidMount() {
    this.getEvents(this.state.url);
    // this.getEvents(this.state.rsvp);
  }

  getEvents = async (url) => {
    (await fetch(
      url
    ))
      .json()
      .then(results => {
        this.setState({event: results})
      });
  };

  render() {
    const {event, index} = this.state

    return (
        <>
        <Nav />
           { event.length !==0 && <Event event={event[index]}/> }
          <Pagenation index={index}/>
        </>
    );
  }
}

export default App;
