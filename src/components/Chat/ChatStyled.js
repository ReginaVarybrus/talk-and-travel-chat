import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: var(--white-color);
  position: relative;
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
  flex-grow: 1;
  width: 100%;
  background: var(--color-grey-3);
  transition: height 0.3s ease;
`;

export const MessageBarWrapper = styled.footer`
  width: 100%;
  min-height: 112px;
  max-height: 444px;
  background: var(--white-color);
  border-top: 1px solid var(--color-grey-6);width: 100%;
  transition: height 0.3s ease;
`;

export const MessageBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin: 32px;
`;

export const Input = styled.textarea`
  width: 100%;
  min-height: 48px;
  max-height: 190px; 
  height: auto;
  border: 1px solid var(--color-grey-6);
  border-radius: 8px;
  margin-left: 16px;
  margin-right: 16px;
  padding: 5.7px 16px;
  box-sizing: border-box;
  outline: none;
  color: var(--color-grey-8);
  resize: none;
  overflow: hidden;
  line-height: 32px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 2px; 
    height: 100%;
    background-color: #000; 
    left: 16px; 
    box-sizing: border-box;
  }

   &::first-line {
    line-height: 32px;
  } 

  &::placeholder {
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;
    color: var(--color-grey-7);
  }

  &:focus {
    &::placeholder {
      color: transparent;
    }
  }
`;

export const ButtonAddFile = styled.button`
  min-width: 48px;
  height: 48px;
  background: var(--white-color);
  border: 1px solid var(--color-grey-6);
  border-radius: 8px;
  cursor: pointer;
`;

export const ButtonSendMessage = styled.button`
  min-width: 48px;
  height: 48px;
  background: var(--white-color);
  border-radius: 8px;
  cursor: pointer;
`;
