import styled from 'styled-components';
import Box from '@mui/material/Box';
import { device } from '@/constants/mediaQueries';

export const InfoModalStyled = styled(Box)`
  box-sizing: border-box;
  position: relative;
  width: 279px;
  padding: 32px;
  margin: auto;
  background: var(--white-color);
  border-radius: 16px;
  box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.3);
  z-index: 1;
  @media ${device.mobileM} {
    width: 327px;
  }
  @media ${device.tablet} {
    width: 416px;
  }
`;

export const DownloadBtn = styled.button`
  display: block;
  background: none;
  border: none;
  margin: auto;
  cursor: pointer;

  svg {
    stroke: var(--color-grey-9);
    width: 27px;
    height: 27px;
    transition: all 0.3s ease;
  }

  &:hover,
  &:focus,
  &:active {
    svg {
      stroke: var(--color-blue-3);
    }
  }

  @media ${device.tablet} {
    right: 14px;
    top: 17px;
  }
`;
