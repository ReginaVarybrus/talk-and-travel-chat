import styled from 'styled-components';

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 16px;
  background: var(--white-color);
  &:hover {
    background: var(--color-blue-1);
  }
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background: var(--color-blue-1);
  margin-right: 12px;
`;

export const ChatName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 156px;
  height: 50px;
  & > p {
    color: var(--color-grey-9);
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
