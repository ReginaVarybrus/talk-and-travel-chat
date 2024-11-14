import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { MdMoreHoriz } from 'react-icons/md';
import { iconProperties } from '@/components/SideBar/SideBarStyled';

export const TapBarStyled = styled(Box)`
  display: ${({ $isChatVisible }) => ($isChatVisible ? 'none' : 'block')};
  z-index: 1;

  .css-16lloyr-MuiBottomNavigation-root {
    height: 100px;
  }

  @media ${device.tablet} {
    display: none;
  }

  .css-16lloyr-MuiBottomNavigation-root {
    height: 100px;
  }
`;

export const TapBarButton = styled(BottomNavigationAction)`
  flex-direction: row;
  color: ${({ $isActive }) =>
    $isActive ? 'var(--color-brand-blue)' : 'var(--color-grey-9)'};

  svg {
    stroke: currentColor;
  }

  .Mui-selected {
    color: currentColor;
    font-weight: ${({ $isActive }) => ($isActive ? '700' : '400')};

    svg {
      stroke: currentColor;
    }
  }

  &:hover {
    color: var(--color-blue-3);

    svg {
      stroke: currentColor;
    }
  }
`;

export const MoreIcon = styled(MdMoreHoriz)`
  ${iconProperties('24px', '24px', '12px')};
`;
