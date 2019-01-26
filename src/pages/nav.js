import React, { Component } from 'react';
import styled from 'styled-components';

class Nav extends Component {
    state = {
        nav: ['Explore', 'Messages', 'Notifications']
    }
  render() {
    return (
      <Wrapper>
        <h2>Meetus</h2>
        <List>
            <Li main>Start a new Group</Li>
          {this.state.nav.map((e,i) => <Li key={i}>{e}</Li>)}
        </List>
      </Wrapper>
    );
  }
}

export default Nav;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    border-bottom: 3px solid rgba(225, 225, 225, .8);

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
