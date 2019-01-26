import React from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import moment from 'moment';

const Location = props => {
  const { lat, lon, name, address_1, address_2, city, state } = props.event.venue;
  const { event } = props;
  const center = {
    lat,
    lng: lon
  };

  console.log(event)

  return (
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
  );
};

export default Location;

const Marker = () => {
  return (
    <Img
      src="https://image.flaticon.com/icons/svg/149/149059.svg"
      alt="Map marker"
    />
  );
};

const MapWrapper = styled.div`
  width: 25vw;
  height: 40vh;
  border-radius: 10px;
  background: #fff;
  padding-bottom: 2vh;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
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


    // color: #00A2C7;
