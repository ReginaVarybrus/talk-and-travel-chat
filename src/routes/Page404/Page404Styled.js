import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const Container = styled.div`
  position: relative;
  background-color: var(--color-blue-1);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
`;

export const ContentBox = styled.div`
  z-index: 10;
  h1 {
    color: var(--color-grey-12);
    font-size: 100px;
    font-weight: 200;
  }

  h3 {
    color: var(--color-grey-12);
    font-size: 18px;
  }

  p {
    color: var(--color-grey-9);
    font-size: 12px;
    margin-bottom: 25px;
  }

  a {
    font-size: 16px;
    font-weight: 700;
    padding: 12px 24px;
    background-color: var(--color-brand-blue);
    box-shadow: 4px 2px 16px 0px rgba(136, 165, 191, 0.48);
    color: var(--white-color);
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  a:hover,
  a:focus,
  a:active {
    background: var(--color-blue-5);
  }

  @media ${device.tablet} {
    h1 {
      font-size: 236px;
    }
    h3 {
      font-size: 28px;
      margin-bottom: 20px;
    }
    p {
      font-size: 18px;
      margin-bottom: 35px;
    }
  }
`;

export const Globe = styled.div`
  position: absolute;
  bottom: 62%;
  left: 5%;
  transform: scale(0.8);
  z-index: 2;

  @media ${device.tablet} {
    transform: scale(1);
    bottom: 31%;
    left: 10%;
  }
`;

export const Star = styled.div`
  position: absolute;
  bottom: 70%;
  left: 70%;
  transform: scale(0.8);
  z-index: 2;

  @media ${device.tablet} {
    transform: scale(1);
    bottom: 10%;
    left: 50%;
  }
`;

export const TelegramBox = styled.div`
  position: absolute;
  bottom: 14%;
  right: 5%;
  transform: scale(0.7);
  z-index: 2;

  @media ${device.tablet} {
    transform: scale(1);
    bottom: 24%;
    right: 4%;
  }

  & > svg:nth-child(1) {
    position: relative;
    left: 100px;
    bottom: 100px;
    z-index: 2;
  }
  & > svg:nth-child(2) {
    position: relative;
    left: -63px;
    top: 53px;
    z-index: 2;
  }
`;
