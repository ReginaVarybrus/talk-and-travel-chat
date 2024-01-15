import React from 'react';
import PropTypes from 'prop-types';
import { SideBarButton, SideBarIcon, Text } from './SideBarItemStyled';
import Icons from '../Icons/Icons';

function SideBarItem({
  onClick,
  isActive,
  alt,
  name,
  fill,
  stroke,
  size,
  children,
}) {
  return (
    <SideBarButton
      onClick={() => onClick()}
      style={{
        color: isActive ? 'var(--color-brand-blue)' : 'var(--color-grey-9)',
        fontWeight: isActive ? '700' : '400',
      }}
    >
      <SideBarIcon alt={alt}>
        <Icons name={name} fill={fill} stroke={stroke} size={size} />
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
  fill: PropTypes.string,
  stroke: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.string,
};

export default SideBarItem;
