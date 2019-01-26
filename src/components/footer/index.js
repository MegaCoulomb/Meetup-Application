import React from 'react';
import styled from 'styled-components';

const index = () => {
    return (
        <Wrapper>
            <Container>
            <p>© 2019 Olive Branch Designs</p>
            <img
                src="https://res.cloudinary.com/dwvrok1le/image/upload/v1547328733/olive-branch.png"
                alt=""
            />
            </Container>
            <Text>This is a fictitious event management project, cloning the ReactJS group from Meetup.com.</Text>
        </Wrapper>
    );
};

export default index;

const Wrapper = styled.div`
    background: #343E48;
    height: 15vh;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        height: 20px;
    }
`

const Text = styled.p`
    margin-right: 5vw;
`

const Container =styled.div`
    display: flex;
    align-items: center;
    margin-left: 5vw;
`