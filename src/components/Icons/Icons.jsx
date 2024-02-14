import React from 'react';
import PropTypes from 'prop-types';
import sprite from '@/images/icons/sprite.svg';

function Icons({ name, fill, stroke, size }) {
  return (
    <svg
      className="icon"
      fill={fill}
      stroke={stroke}
      width={size}
      height={size}
    >
      <use href={`${sprite}#icon-${name}`} />
    </svg>
  );
}

Icons.propTypes = {
  name: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  size: PropTypes.string,
};

export default Icons;
