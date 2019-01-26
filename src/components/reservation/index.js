import React from 'react';
import styled from 'styled-components';

const reservation = props => {
  console.log(props);
  const map = props.rsvp.slice(0, 9).map(e => {
    const { id, name, photo, type } = e.member;
    return (
      <Cont key={id}>
        <img src={photo.highres_link || 'https://stock.wikimini.org/w/images/9/95/Gnome-stock_person-avatar-profile.png'} alt="Attendee avatar" />
        <p>{name}</p>
        <p>{photo.type}</p>
      </Cont>
    );
  });
  return <Wrapper><h2>Attendees({props.rsvp.length})</h2>{map}</Wrapper>;
};

export default reservation;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const Cont = styled.div`
display: flex;
flex-direction: column;
align-items: center;
  width: 10vw;
  height: max-content;
  background: #fff;
  border-radius: 10px;
  margin: 1%;
   img {
    height: 5em;
    width: 5em;
    border-radius: 50%;
  }

  p:nth-of-type(1) {
    font-weight: 600;
  }
`;
