import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const UnreadMessagesCount = styled.span`
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

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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

export const ChatNameStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Avatar = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 18px;
  background: var(--color-grey-6);
  color: var(--white-color);
  margin-right: 12px;
`;

export const BadgeStyled = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--white-color);

  &:after {
    position: absolute;
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-badge);
  }
`;

export const ChatName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  width: calc(100% - 58px);
  height: 50px;
`;

export const NameAndDayBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    flex-shrink: 0;
    color: var(--color-grey-9);
    white-space: nowrap;
  }
`;

export const CompanionName = styled.h6`
  flex-grow: 1;
  margin-right: 8px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MessageAndCountBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
  p {
    color: var(--color-grey-9);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
  }
`;
