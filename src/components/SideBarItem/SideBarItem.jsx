import React from 'react';
import PropTypes from 'prop-types';
import { SideBarButton, SideBarIcon, Text } from './SideBarItemStyled';
import Icons from '../Icons/Icons';

function SideBarItem({
  onClick,
  isActive,
  alt,
  name,
  stroke,
  size,
  children,
}) {
  return (
    <SideBarButton onClick={() => onClick()} isActive={isActive}>
      <SideBarIcon alt={alt}>
        <Icons
          name={name}
          stroke={stroke}
          size={size}
          fill={isActive ? 'var(--color-brand-blue)' : 'var(--color-grey-9)'}
        />
      </SideBarIcon>
      <Text>{children}</Text>
    </SideBarButton>
  );
}

SideBarItem.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  alt: PropTypes.string,
  name: PropTypes.string,
  stroke: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.string,
};

export default SideBarItem;
