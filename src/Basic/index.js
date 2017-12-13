import React from 'react';
import OriginTransformer from '../OriginTransformer';
import './index.css';

export default class Basic extends React.Component {
  render() {
    const { angle, transformOrigin: { x, y }, animated } = this.props;

    return (
      <svg
        viewBox="-23 -20.5 46 41"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        aria-labelledby="title"
        fill="none"
        style={{ border: '4px dashed crimson' }}
      >
        <title id="title">React Logo with visual helpers</title>
        <rect
          x="-11.5"
          y="-10.25"
          width="23"
          height="20.5"
          strokeWidth="1"
          stroke="crimson"
          strokeOpacity="0.5"
        />
        <circle r="2" fill="#61dafb" />
        <g stroke="#61dafb">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <OriginTransformer x={x} y={y} className={animated && 'animated'}>
            <ellipse
              rx="11"
              ry="4.2"
              stroke="rebeccapurple"
              style={{ transform: `rotate(${angle}deg)` }}
            />
          </OriginTransformer>
        </g>
      </svg>
    );
  }
}
