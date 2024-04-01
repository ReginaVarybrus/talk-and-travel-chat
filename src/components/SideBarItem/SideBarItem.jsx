import PropTypes from 'prop-types';
import { SideBarButton, SideBarIcon, Text } from './SideBarItemStyled';
import Icons from '../Icons/Icons';

const SideBarItem = ({
  onClick,
  isActive = false,
  alt,
  name,
  stroke,
  size,
  children,
}) => (
  <SideBarButton onClick={() => onClick()} $isActive={isActive}>
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
