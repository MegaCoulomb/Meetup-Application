import React from 'react';
import styled from 'styled-components';

const index = (props) => {
    const {event} = props
    console.log(event)
    return (
        <MainWrapper>
            <h2>Details</h2>
            <div className='innerHTML' dangerouslySetInnerHTML={{ __html: event.description }} />
        </MainWrapper>
    );
};

export default index;

const MainWrapper = styled.div`
    background: #F6F7F8;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        padding-top: 5vh;
    }

    .innerHTML {
        width: 50vw;
        line-height: 2em;
    }
`