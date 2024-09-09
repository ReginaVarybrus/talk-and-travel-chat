import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { MdMoreHoriz } from 'react-icons/md';

export const TapBarStyled = styled(Box)`
  z-index: 1;
  @media ${device.tablet} {
    display: none;
  }
`;

export const TapBarButtonsWrapper = styled(BottomNavigation)``;

export const TapBarButton = styled(BottomNavigationAction)`
  flex-direction: row;
`;

export const MoreIcon = styled(MdMoreHoriz)`
  width: 24px;
  height: 24px;
  margin-right: 12px;
  stroke: var(--color-grey-9);
`;
