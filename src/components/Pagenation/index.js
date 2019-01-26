import React, { Component } from 'react';
import styled from 'styled-components';

class index extends Component {
    render() {
        console.log(this.props)
        const {index, length} = this.props
        return (
            <Wrapper>
            {!!index && <button onClick={() => this.props.pagenation(-1)}>Previous</button>}
            <p>{index}</p>
            {index < length -1 && <button onClick={() => this.props.pagenation(1)}>Next</button>}
            </Wrapper>
        );
    }
}

export default index;


const Wrapper = styled.div`
    display: flex;
    align-items: center;
`