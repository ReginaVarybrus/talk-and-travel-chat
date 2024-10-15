import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const UnreadMessagesCount = styled.div`
  background: var(--color-blue-1);
  border-radius: 50px;
  color: var(--color-dark);
  font-size: 12px;
  font-weight: 500;
  width: 23px;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  @media ${device.tablet} {
    width: 30px;
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
  font-size: 14px;
  color: var(--color-grey-9);
`;

export const ListItems = styled.ul`
  width: 100vw;
  @media ${device.tablet} {
    width: 248px;
  }
  @media ${device.laptop} {
    width: 298px;
  }
`;

export const ChatNameBox = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 18px;
    font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  }
`;

export const Flag = styled.img`
  width: 32px;
  height: 24px;
  padding-right: 12px;
`;
