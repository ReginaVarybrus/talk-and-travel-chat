import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';
import { Box } from '@mui/material';

export const BoxStyled = styled(Box)`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 16px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--white-color);
  border-radius: 16px;
  box-shadow:
    0px 2px 6px 2px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  padding: 16px;
  width: 295px;

  @media ${device.tablet} {
    width: 416px;
    padding: 32px;
    gap: 32px;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 5px;
  top: 9px;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    stroke: var(--color-grey-9);
    width: 27px;
    height: 27px;
    transition: stroke 0.3s;
  }

  &:hover {
    svg {
      stroke: var(--color-blue-3);
    }
  }

  @media ${device.tablet} {
    right: 14px;
    top: 17px;
  }
`;
