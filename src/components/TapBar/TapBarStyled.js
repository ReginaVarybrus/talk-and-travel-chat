import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';
import Box from '@mui/material/Box';

export const TapBarStyled = styled(Box)`
  z-index: 1;
  @media ${device.tablet} {
    display: none;
  }
`;
