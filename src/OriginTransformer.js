import React from 'react';

// transform-origin: 50% 50%; doesn't work the same way on Firefox & other browsers
// we fix this behavior by calculating the element origin when it mounts
// and passing this origin to the transform-origin css property
export default class OriginTransformer extends React.Component {
  state = {
    elementsOrigin: [],
  };

  // unique list of DOM nodes references
  elements = new Set();

  componentDidMount() {
    const elementsOrigin = Array.from(this.elements).map(element => {
      const { x: posX, y: posY, width, height } = element.getBBox();
      const { x: percentX = 0, y: percentY = 0 } = this.props;

      return {
        x: posX + width * percentX / 100,
        y: posY + height * percentY / 100,
      };
    });

    console.log(elementsOrigin);
    this.setState(() => ({ elementsOrigin }));
  }

  componentDidUpdate() {
    this.elements.clear();
  }

  render() {
    const { children, x, y, ...props } = this.props;
    const { elementsOrigin } = this.state;

    return React.Children.map(this.props.children, (child, index) => {
      const refKey = child.type.name === 'StyledComponent' ? 'innerRef' : 'ref';

      return React.cloneElement(child, {
        ...props,
        [refKey]: element => this.elements.add(element),
        style: {
          ...child.props.style,
          transformOrigin:
            elementsOrigin.length > 0
              ? `${elementsOrigin[index].x}px ${elementsOrigin[index].y}px`
              : undefined,
        },
      });
    });
  }
}
