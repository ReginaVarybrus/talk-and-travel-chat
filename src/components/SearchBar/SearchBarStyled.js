import styled from 'styled-components';
import Box from '@mui/material/Box';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-width: 300px;
  height: 100vh;
  padding: 48px 16px;
  box-sizing: border-box;
  border-right: 1px solid var(--color-grey-6);
  background: var(--white-color);
`;

export const Text = styled.p`
  text-align: center;
  font-size: 14px;
  color: var(--color-grey-9);
`;

export const ButtonMapOpen = styled.button`
  width: 100%;
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
`;

export const MapBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 400, */
  background: var(--white-color);
  border-radius: 32px;
  boxShadow: 24;
  p: 4;
`;

