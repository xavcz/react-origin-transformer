import React from 'react';
import styled, { keyframes } from 'styled-components';
import OriginTransformer from '../OriginTransformer';

export default class StyledComponent extends React.Component {
  render() {
    const { fill, stroke, transformOrigin } = this.props;

    return (
      <Svg
        viewBox="-100 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        aria-labelledby="title"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title id="title">A bouncing ball</title>
        <OriginTransformer x={transformOrigin.x} y={transformOrigin.y}>
          <BouncingBall r="8" cx="0" cy="180" fill={fill} stroke={stroke} />
        </OriginTransformer>
      </Svg>
    );
  }
}

const Svg = styled.svg`
  height: 100vh;
`;

const bounce = keyframes`
  0% {
    transform: scale(1, 1) translate(0, 0);
  }
  10% {
    transform: scale(1.1, 0.9) translate(0, 0);
  }
  20% {
    transform: scale(1, 1) translate(0, 0);
    animation-timing-function: ease-out;
  }
  40% {
    transform: scale(0.9, 1.1) translate(0, -150px);
    animation-timing-function: ease-in; 
  }
  60% {
    transform: scale(1, 1) translate(0, 0);
    animation-timing-function: ease-in;
  }
  65% {
    transform: scale(1.1, 0.9) translate(0, 0);
    animation-timing-function: ease-in;
  }
  70% {
    transform: scale(1, 1) translate(0, 0);
  }
  100% {
    transform: scale(1, 1) translate(0, 0);
  }

`;

const BouncingBall = styled.circle`
  fill: ${props => props.fill};
  stroke: ${props => props.stroke};
  animation: ${bounce} 4s linear infinite;
`;
