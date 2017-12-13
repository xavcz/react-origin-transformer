import React from 'react';
import styled, { keyframes } from 'styled-components';
import OriginTransformer from '../OriginTransformer';

// these values control the prototype
const baseDuration = 0.5; // unit = second
const baseDistance = 10; // unit = pixels
const drawingDelay = 1 / 3; // unit = second

export default class MultipleChildren extends React.Component {
  // the number of dots the order of the animation
  // we show one by one the dots
  // then make the hexagon appears
  // then make the triangle sides appear and draw them
  dots = [
    // top
    'M64 36c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8',
    // top-right
    'M89.04 50.52c-2.2-3.84-.9-8.73 2.94-10.96 3.83-2.2 8.72-.9 10.95 2.94 2.2 3.84.9 8.73-2.94 10.96-3.85 2.2-8.76.9-10.97-2.94',
    // bottom-right
    'M102.9 87.5c-2.2 3.84-7.1 5.15-10.94 2.94-3.84-2.2-5.14-7.12-2.94-10.96 2.2-3.84 7.12-5.15 10.95-2.94 3.86 2.23 5.16 7.12 2.94 10.96',
    // bottom
    'M64 110c-4.43 0-8-3.6-8-8.02 0-4.44 3.57-8.02 8-8.02s8 3.58 8 8.02c0 4.4-3.57 8.02-8 8.02',
    // bottom-left
    'M25.1 87.5c-2.2-3.84-.9-8.73 2.93-10.96 3.83-2.2 8.72-.9 10.95 2.94 2.2 3.84.9 8.73-2.94 10.96-3.85 2.2-8.74.9-10.95-2.94',
    // top-left
    'M38.96 50.52c-2.2 3.84-7.12 5.15-10.95 2.94-3.82-2.2-5.12-7.12-2.92-10.96 2.2-3.84 7.12-5.15 10.95-2.94 3.83 2.23 5.14 7.12 2.94 10.96',
  ];

  sides = [
    'M63.55 27.5l32.9 19-32.9-19z',
    'M96 46v38-38z',
    'M96.45 84.5l-32.9 19 32.9-19z',
    'M64.45 103.5l-32.9-19 32.9 19z',
    'M32 84V46v38z',
    'M31.55 46.5l32.9-19-32.9 19z',
  ];

  render() {
    return (
      <Logo
        viewBox="0 0 128 128"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        role="presentation"
        aria-labelledby="title"
      >
        <title id="title">The GraphQL Playground Logo, animated</title>
        <linearGradient
          id="linearGradient-1"
          x1="4.86%"
          x2="96.21%"
          y1="0%"
          y2="99.66%"
        >
          <stop stopColor="#E00082" stopOpacity=".8" offset="0%" />
          <stop stopColor="#E00082" offset="100%" />
        </linearGradient>
        <g>
          <rect
            id="Gradient"
            width="127.96"
            height="127.96"
            y={1}
            fill="url(#linearGradient-1)"
            rx={4}
          />
          <OriginTransformer
            x={this.props.transformOrigin.x}
            y={this.props.transformOrigin.y}
          >
            {this.dots.map((definition, index) => (
              <Dot
                key={`dot-${index}`}
                fill="#fff"
                d={definition}
                delay={drawingDelay * 2 / 3 + index * 0.2}
                // style={{ transformOrigin: '50% 50%' }}
              />
            ))}
          </OriginTransformer>
          {this.sides.map((definition, index) => (
            <HexagonSide
              key={`side-${index}`}
              stroke="#fff"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              d={definition}
              delay={drawingDelay + index * 0.2}
            />
          ))}
          <TriangleSide
            delay={drawingDelay * 2 + (this.dots.length + 1) * 0.1}
            id="Triangle-Bottom"
            stroke="#fff"
            strokeWidth={4}
            d="M30 84h70"
            strokeLinecap="round"
          />
          <TriangleSide
            delay={drawingDelay * 2.5 + (this.dots.length + 1) * 0.1}
            id="Triangle-Left"
            stroke="#fff"
            strokeWidth={4}
            d="M65 26L30 87"
            strokeLinecap="round"
          />
          <TriangleSide
            delay={drawingDelay * 3 + (this.dots.length + 1) * 0.1}
            id="Triangle-Right"
            stroke="#fff"
            strokeWidth={4}
            d="M98 87L63 26"
            strokeLinecap="round"
          />
        </g>
      </Logo>
    );
  }
}

// used to draw the triangle sides or hexagon sides
const draw = ({ length, complete }) => keyframes`
0% { stroke-dashoffset: ${length}; }
${complete ? '50' : '100'}% { stroke-dashoffset: ${length * 2}; }
${complete && `100% { stroke-dashoffset: ${length * 3}; }`}
`;

// used to scale the dots
const scale = keyframes`
0% {
  transform: scale(0);
}
100% {
  transform: scale(1);
}
`;

// used for loading, playground and svg paths (dots, hexagon, triangle)
const fade = ({ disappear, distance }) => keyframes`
${disappear ? 'from' : 'to'} {
  opacity: 1;
  transform: translateY(0);
}
${disappear ? 'to' : 'from'} {
  opacity: 0;
  transform: translateY(${-distance}px);
}
`;

const loadingIn = fade({ disappear: false, distance: baseDistance });
const loadingOut = fade({ disappear: true, distance: baseDistance });
const sideIn = fade({ disappear: false, distance: 0 });

const Dot = styled.path`
  transform: scale(0);
  animation: ${scale} ${baseDuration / 2}s linear forwards
    ${props => props.delay || 0.5}s;
`;

const HexagonSide = styled.path`
  opacity: 0;
  stroke-dasharray: 76;
  animation: ${draw({
        length: 76,
        complete: false,
      })}
      ${baseDuration}s ease-out forwards ${props => props.delay || 0}s,
    ${sideIn} 0.1s ease-out forwards ${props => props.delay || 0.5}s;
  animation-iteration-count: 1, 1;
`;

const TriangleSide = styled.path`
  opacity: 0;
  stroke-dasharray: 70;
  animation: ${draw({ length: 70, complete: false })} ${baseDuration * 1.2}s
      ease-in-out forwards ${props => props.delay || 0}s,
    ${sideIn} 0.1s linear forwards ${props => props.delay || 0.5}s;
  animation-iteration-count: 1, 1;
`;

const Logo = styled.svg`
  max-height: 80vh;
  opacity: ${props => (props.transitioning ? 1 : 0)};
  animation: ${props => (props.transitioning ? loadingOut : loadingIn)}
    ${baseDuration}s ease-out forwards;
`;
