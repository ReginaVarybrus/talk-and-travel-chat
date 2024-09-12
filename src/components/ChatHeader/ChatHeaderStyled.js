import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const ChatHeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 75px;
  background: var(--white-color);
  border-bottom: 1px solid var(--color-grey-6);
  padding-left: 64px;

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--color-grey-9);
    transition: color 0.3s;
  }

  &:hover {
    cursor: pointer;
  }
  &:hover p {
    color: var(--color-blue-3);
  }
`;

export const ButtonBack = styled.button`
  display: block;
  @media ${device.tablet} {
    display: none;
  }
`;
