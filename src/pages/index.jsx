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
  const handleLambda = async () => {
    const sides = 12;
    let response = await fetch(`/.netlify/functions/die-roll?sides=${sides}`);
    response = await response.json();
    console.log(response);

    response = await fetch('/.netlify/functions/headless-chrome');
    response = await response.json();
    console.log(response);
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
