import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 300px;
  height: 100vh;
  /* background: var(--color-blue-1); */
`;

export const Text = styled.p`
  text-align: center;
  font-size: 14px;
  color: var(--color-grey-9);
  margin: 0 16px;
`;

export const ListItems = styled.ul`
  position: absolute;
  width: 299.4px;
  height: 562px;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0 16px;
  background: var(--white-color);
  &:hover {
    background: var(--color-blue-1);
  }
`;

export const Flag = styled.img`
  width: 32px;
  height: 24px;
  padding-right: 12px;
`;