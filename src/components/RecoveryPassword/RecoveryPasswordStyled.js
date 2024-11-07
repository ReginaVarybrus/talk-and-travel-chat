import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';
import { Box } from '@mui/material';
import backgroundImage from '@/images/bg-png.png';

export const BoxStyled = styled(Box)`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--white-color);
  border-radius: 16px;
  box-shadow:
    0px 2px 6px 2px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  padding: 24px;
  width: 295px;

  @media ${device.tablet} {
    width: 416px;
    padding: 32px;
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

export const Title = styled.h6`
  text-align: center;
  font-size: 20px;
`;

export const Subtitle = styled.p`
  text-align: center;
  font-size: 14px;
  color: var(--color-grey-8);
  margin-bottom: 16px;
`;
export const ResetPasswordBackground = styled.section`
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  @media (min-width: 767px) {
    background: url(${backgroundImage});
    background-size: cover;
  }
`;

export const ResetPasswordContainer = styled.div`
  max-width: 500px;

  @media (min-width: 768px) {
    max-width: 600px;
    background: var(--color-grey-4);
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 56px 120px;
  }
`;

export const TitleResetPage = styled.h1`
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const SubtitleResetPage = styled.p`
  font-size: 16px;
  text-align: center;
  color: var(--color-grey-8);
  margin-bottom: 48px;
`;
