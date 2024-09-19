import styled from 'styled-components';
import Box from '@mui/material/Box';
import { device } from '@/constants/mediaQueries';

export const SearchBarStyled = styled.div`
  display: ${({ $isChatVisible }) => ($isChatVisible ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 48px 0 0;
  box-sizing: border-box;
  background: var(--white-color);

  @media ${device.tablet} {
    display: flex;
    width: 250px;
    border-right: 1px solid var(--color-grey-6);
    border-left: 1px solid var(--color-grey-6);
    padding: 48px 16px;
  }
  @media ${device.laptop} {
    display: flex;
    width: 300px;
    border-right: 1px solid var(--color-grey-6);
    border-left: 1px solid var(--color-grey-6);
    padding: 48px 16px;
  }
`;

export const Text = styled.p`
  text-align: center;
  font-size: 14px;
  color: var(--color-grey-9);
`;

export const ButtonMapOpen = styled.button`
  width: 90%;
  min-height: 36px;
  margin-bottom: 34px;
  font-size: 14px;
  font-weight: 700;
  background: var(--white-color);
  color: var(--color-grey-8);
  border-radius: 4px;
  border: 1px solid var(--color-brand-blue);
  cursor: pointer;
  &:hover {
    background: var(--color-blue-1);
  }

  @media ${device.laptop} {
    width: 100%;
  }
`;

export const MapBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--white-color);
  border-radius: 32px;
  boxshadow: 24;
  p: 4;
`;
