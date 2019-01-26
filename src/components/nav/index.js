import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

class Nav extends Component {
    state = {
        nav: ['Explore', 'Messages', 'Notifications'],
        display: 'none'
    }

    handleClick = () => {
        const {display} = this.state
        this.setState(display === 'none' ? {display: 'block'} : {display: 'none'})
        setInterval(() => {
            this.setState({display: 'none'})
        }, 3000)
    }
  render() {
    return (
      <Wrapper>
        <h2>Meetus</h2>
        <List>
            <Li onClick={this.handleClick} tabIndex='0' main>Start a new Group</Li>
          {this.state.nav.map((e,i) => <Li onClick={this.handleClick} tabIndex='0' key={i}>{e}</Li>)}
        </List>
        <Container display={this.state.display}>
            <p>These buttons are for show!</p>
        </Container>
      </Wrapper>
    );
  }
}

export default Nav;

const entrance = keyframes`
   0% {
    transform: translateY(-10vh)
   }
   50% {
    transform: translate(0)
   }
   100% {
    transform: translateY(-10vh)
   }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    border-bottom: 3px solid rgba(225, 225, 225, .8);
    background: #fff;

    h2 {
        text-indent: 1em;
        font-family: cursive;
        color: #F54061;
    }
`

const List = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    width: 45vw;
`

const Li = styled.li`
    color: ${props => props.main && '#00A2C7'};
    border-right: ${props => props.main && '1px solid #e3e3e3'};
    padding: ${props => props.main && '0 1em'};
    cursor: pointer;

    &:hover {
        color: #00A2C7;
    }
`

const Container = styled.div`
    position: absolute;
    display: ${props => props.display};
    right: 5vh;
    bottom: -10vh;
    padding: 1vh 1vw;
    background: #fff;
    box-shadow: 1px 2px 5px 1px grey;
    z-index: -1;
    animation: ${entrance} 3s;
`
