import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 5%;
  background: var(--white-color);
  cursor: pointer;
  &:hover {
    background: var(--color-blue-1);
  }
  @media ${device.tablet} {
    padding: 0 16px;
  }
`;

export const ChatNameStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.div`
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

export const ChatName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 116px;
  height: 50px;
  & > p {
    color: var(--color-grey-9);
  }
  @media ${device.laptop} {
    width: 156px;
  }
`;

export const MessageDay = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 40px;
  height: 50px;
  & > p {
    color: var(--color-grey-9);
  }
`;
