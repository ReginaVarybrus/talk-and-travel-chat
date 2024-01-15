import React from 'react';
import sprite from '../../images/sprite.svg';
import PropTypes from 'prop-types';

function Icons({ name, fill, stroke, size }) {
  return (
    <svg
      className="icon"
      fill={fill}
      stroke={stroke}
      width={size}
      height={size}
    >
      <use href={sprite + '#icon-' + name}></use>
    </svg>
  );
}

Icons.propTypes = {
  name: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  size: PropTypes.string
};

export default Icons;

