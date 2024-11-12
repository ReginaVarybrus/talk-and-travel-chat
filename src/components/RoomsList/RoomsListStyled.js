import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const UnreadMessagesCount = styled.span`
  background: var(--color-blue-1);
  border-radius: 50px;
  color: var(--color-dark);
  font-size: 12px;
  font-weight: 500;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  flex-shrink: 0;
  background: ${({ $isActive }) =>
    $isActive ? 'var(--white-color)' : 'var(--color-blue-1)'};

  @media ${device.tablet} {
    color: var(--color-grey-9);
  }
`;

export const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 5%;
  background: ${({ $isActive }) =>
    $isActive ? 'var(--color-blue-1)' : 'var(--white-color)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-blue-1);

    & ${UnreadMessagesCount} {
      background: var(--white-color);
    }
  }
  @media ${device.tablet} {
    padding: 0 16px;
  }
`;

export const Text = styled.p`
  text-align: center;
  color: var(--color-grey-9);
`;

export const ListItemsStyled = styled.ul`
  max-height: calc(100vh - 279px);
  width: 100vw;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-5);
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    height: 144px;
    border-radius: 100px;
    background: var(--color-grey-9);
  }

  @media ${device.tablet} {
    width: 248px;
    max-height: calc(100vh - 229px);
  }
  @media ${device.laptop} {
    width: 298px;
    max-height: calc(100vh - 229px);
  }
`;

export const ChatNameBox = styled.div`
  display: flex;
  align-items: center;
  width: 253px;

  @media ${device.mobileM} {
    width: 304px;
  }

  @media ${device.mobileL} {
    width: 348px;
  }

  @media ${device.tablet} {
    width: 180px;
  }

  @media ${device.laptop} {
    width: 230px;
  }
`;

export const ChatName = styled.h6`
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
`;
