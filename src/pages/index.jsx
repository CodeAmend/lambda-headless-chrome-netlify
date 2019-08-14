import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  p { grid-column: 2; }
  button { grid-column: 2;}
`;

export default () => {
  const handleLambda = () => {
    console.log("HANDLE LAMBDA");
    fetch('/.netlify/functions/first-func')
      .then(res => res.json())
      .then(console.log);
  }
  return (
    <Wrapper>
      <p>Open console</p>
      <button onClick={handleLambda}>
        Click to start headless
      </button>
    </Wrapper>
  );
}
