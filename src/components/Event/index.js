import React from 'react';
import styled from 'styled-components';

import Pagination from '../pagination/index';

const index = (props) => {
    const {event} = props
    return (
        <MainWrapper>
            <h2>Details</h2>
            <div className='innerHTML' dangerouslySetInnerHTML={{ __html: event.description }} />
            <Pagination
              index={props.index}
              length={props.length}
              pagination={props.pagination}
            />
        </MainWrapper>
    );
};

export default index;

const MainWrapper = styled.div`
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
        margin-bottom: 5vh;

        @media (max-width: 1100px) {
        width: auto;
      }
    }
`