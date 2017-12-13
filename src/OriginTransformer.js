import React from 'react';

// transform-origin: 50% 50%; doesn't work the same way on Firefox & other browsers
// we fix this behavior by calculating the element origin when it mounts
// and passing this origin to the transform-origin css property
export default class OriginTransformer extends React.Component {
  state = {
    x: 0,
    y: 0,
  };

  componentDidMount() {
    const { x: posX, y: posY, width, height } = this.element.getBBox();
    const { x: initialX, y: initialY } = this.state;

    const { x: percentX = 0, y: percentY = 0 } = this.props;

    if (!initialX && !initialY) {
      const { x, y } = {
        x: posX + width * percentX / 100,
        y: posY + height * percentY / 100,
      };
      // console.log({ x, y });
      this.setState(() => ({ x, y }));
    }
  }

  render() {
    const { children, x, y, ...props } = this.props;
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        ...props,
        ref: element => (this.element = element),

        style: {
          ...child.props.style,
          transformOrigin: `${this.state.x}px ${this.state.y}px`,
        },
      });
    });
  }
}
