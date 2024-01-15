import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: var(--white-color);
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  min-height: 75px;
  background: var(--white-color);
  border-bottom: 1px solid var(--color-grey-6);
`;

export const HeaderContent = styled.div`
  padding-left: 32px;
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--color-grey-9);
  }
`;

export const MessageBlock = styled.div`
  width: 100%;
  height: 100%;
  background: var(--color-grey-3);
`;

export const MessageBarWrapper = styled.footer`
  width: 100%;
  min-height: 112px;
  background: var(--white-color);
  border-top: 1px solid var(--color-grey-6);
`;

export const MessageBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px;
`;

export const Input = styled.input`
  width: 100%;
  height: 44.4px;
  border: 1px solid var(--color-grey-6);
  border-radius: 8px;
  margin-left: 16px;
  margin-right: 16px;
  padding-left: 16px;
  padding-right: 16px;
  outline: none;
  color: var(--color-grey-8);
`;

export const Button = styled.button`
  min-width: 48px;
  height: 48px;
  background: var(--white-color);
  border: 1px solid var(--color-grey-6);
  border-radius: 8px;
  cursor: pointer;
`;
